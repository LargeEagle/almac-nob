import { v4 as uuidv4 } from "uuid";

export default class noBQuestion {
  #defaultQusetionContainerClass;
  #defalutOpen;

  constructor(targetQestionId, categoryButtonMode = "defaultclose") {
    this.#defaultQusetionContainerClass = "useBootstrapForBreadGorStyle🤪";
    this.categoryButtonMode = categoryButtonMode;

    // this.columnOfItems = column;

    if (
      this.categoryButtonMode.toLowerCase() === "defaultopen" ||
      this.categoryButtonMode.toLowerCase() === "alwayson" ||
      this.categoryButtonMode.toLowerCase() === "lookingfordefaultopen"
    ) {
      this.#defalutOpen = "true";
    } else {
      this.#defalutOpen = "false";
    }

    this.targetQestionElement = document.getElementById(targetQestionId);
    this.data = new questionData(targetQestionId).elementToDataObj;
    this.questionContainer = document.createElement("div");
    this.questionContainer.classList.add(this.#defaultQusetionContainerClass, "accordion");
    this.questionContainer.setAttribute("id", "accordionPanels-" + uuidv4());

    this.genreateEachGroupOfQuestion();
    this.reLocalQuestion();
    // console.log(this.data);
  }

  reLocalQuestion() {
    var categoryToAppend = this.data.filter((data) => {
      return data["parent-cat-id"] !== undefined && data["checkbox-type"] === "category";
    });

    categoryToAppend.forEach((data) => {
      var targetAppend = this.questionContainer.querySelector(
        `div[cat-id="${data["parent-cat-id"]}`
      );
      var targetAppendUUID = targetAppend.getAttribute("id").replace("accordion-item-", "");
      var targetAppendPanel = this.questionContainer.querySelector(
        "#panelsStayOpen-" + targetAppendUUID + "> div"
      );

      var appendElement = this.questionContainer.querySelector(`div[cat-id="${data["cat-id"]}`);
      appendElement.classList.add("subCategory");
      var itemContainer = document.createElement("div");
      itemContainer.classList.add("form-check");

      // console.log(targetAppend);
      if (targetAppendPanel.classList.contains("TwoColumnItemContainer")) {
        itemContainer.classList.add("TwoColumnItem");
      }

      itemContainer.append(appendElement);
      targetAppendPanel.append(itemContainer);
      // console.log(appendElement);
    });
    // console.log(categoryToAppend);
  }

  genreateEachGroupOfQuestion() {
    this.generateQusetion = this.data.forEach((data) => {
      if (data["checkbox-type"] === "category") {
        var uuid = uuidv4();
        var crruentCatId = data["cat-id"];
        var crruentCatColumn = data.column;
        var accordionItem = document.createElement("div");

        accordionItem.classList.add("accordion-item");
        accordionItem.setAttribute("id", "accordion-item-" + uuid);
        accordionItem.setAttribute("cat-id", crruentCatId);

        if (data["parent-cat-id"] !== undefined) {
          accordionItem.setAttribute("parent-cat-id", data["parent-cat-id"]);
        }

        var accodionHeaderId = "accordion-header-" + uuid;
        var contentPanelId = "panelsStayOpen-" + uuid;

        var accordionHeader = this.generateHeader(accodionHeaderId, contentPanelId, data);
        accordionItem.append(accordionHeader);

        var contentPanel = document.createElement("div");
        contentPanel.setAttribute("id", contentPanelId);
        contentPanel.classList.add("accordion-collapse", "collapse");

        if (this.#defalutOpen === "true") contentPanel.classList.add("show");
        contentPanel.setAttribute("aria-labelledby", accodionHeaderId);

        var contentsContainer = document.createElement("div");

        if (data.column === "2") {
          contentsContainer.classList.add("TwoColumnItemContainer");
        }

        if (data["items-direction"] === "y") {
          contentsContainer.classList.add("directionY");

          var allcurrentCatItems = this.data.filter((_data) => {
            if (_data["parent-cat-id"] === crruentCatId && _data["checkbox-type"] === "item") {
              return _data;
            }
          });

          var allcurrentCatItemWithTextbox = this.data.filter((_data) => {
            if (
              _data["parent-cat-id"] === crruentCatId &&
              _data["checkbox-type"] === "item" &&
              _data.hasOwnProperty("textboxId")
            ) {
              return _data;
            }
          });

          var totalOfCurrentCatItems = allcurrentCatItems.length;
          if (totalOfCurrentCatItems % 2 !== 0) totalOfCurrentCatItems = totalOfCurrentCatItems + 1;

          var totalHeight =
            ((totalOfCurrentCatItems - allcurrentCatItemWithTextbox.length) * 18 +
              allcurrentCatItemWithTextbox.length * 24) /
            2;
          contentsContainer.style.height = `${totalHeight}px`;
        }

        //  if (data["single-select"] === "true") {
        //   // console.log(this.questionContainer.getAttribute("id"))
        //   contentPanel.setAttribute("data-bs-parent", `#${this.questionContainer.getAttribute("id")}`);
        //    }

        this.data.forEach((_data) => {
          this.generateCheckboxItem(_data, crruentCatId, contentsContainer, crruentCatColumn);
        });

        contentPanel.append(contentsContainer);
        accordionItem.append(contentPanel);
        this.questionContainer.append(accordionItem);
        // console.log(ParentContentPanel);
      }
    });
  }

  generateHeader(headerId, contentPanelId, data) {
    var accordionHeader = document.createElement("h2");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.setAttribute("id", headerId);

    var accordionButton = document.createElement("button");
    accordionButton.classList.add("accordion-button");

    if (data["single-select-group"] !== undefined) {
      accordionButton.setAttribute("single-select-group", data["single-select-group"]);
    }

    if (this.#defalutOpen !== "true") {
      accordionButton.classList.add("collapsed");
    }

    if (this.categoryButtonMode.toLowerCase() !== "alwayson") {
      accordionButton.setAttribute("data-bs-toggle", "collapse");
      accordionButton.setAttribute("data-bs-target", "#" + contentPanelId);
      accordionButton.setAttribute("aria-expanded", this.#defalutOpen);
      accordionButton.setAttribute("aria-controls", contentPanelId);
    }

    var accordionButtonCheckbox = document.getElementById(data.checkboxId);
    accordionButton.addEventListener("click", () => {
      // console.log("button click")

      if (accordionButton.classList.contains("collapsed")) {
        accordionButtonCheckbox.checked = false;
        this.uncheckChildCheckbox(document.getElementById(contentPanelId));
        this.closeChildPanel(document.getElementById(contentPanelId));
      } else {
        accordionButtonCheckbox.checked = true;

        if (accordionButton.hasAttribute("single-select-group")) {
          var allaccordionButton = [
            ...this.questionContainer.querySelectorAll("button.accordion-button"),
          ];

          var buttonToClose = allaccordionButton.filter((button) => {
            return (
              button.hasAttribute("single-select-group") &&
              button.getAttribute("single-select-group") ===
                accordionButton.getAttribute("single-select-group") &&
              button !== accordionButton
            );
          });
          //console.log(buttonToClose)

          buttonToClose.forEach((button) => {
            var targetDIVpanel = button.closest("div.accordion-item");
            this.uncheckChildCheckbox(targetDIVpanel);
            this.closeChildPanel(targetDIVpanel);
          });
        }
      }
    });

    accordionButtonCheckbox.addEventListener("click", () => {
      // console.log("Checkbox click")
      if (accordionButtonCheckbox.checked === true) {
        accordionButton.classList.remove("collapsed");
        this.uncheckChildCheckbox(document.getElementById(contentPanelId));
        this.closeChildPanel(document.getElementById(contentPanelId));
      } else {
        accordionButton.classList.add("collapsed");
      }
    });

    var observerCheckbox = new MutationObserver(() => {
      if (accordionButton.getAttribute("aria-expanded") === "false") {
        accordionButtonCheckbox.checked = false;
      }
      if (accordionButton.getAttribute("aria-expanded") === "true") {
        accordionButtonCheckbox.checked = true;
      }
      //  console.log(accordionButtonCheckbox.checked)
    });

    observerCheckbox.observe(accordionButton, { attributes: true });

    // var observer = new MutationObserver(callback);
    // observer.observe(accordionButton, { attributes: true });

    var accordionButtonLabel = document.createElement("label");
    accordionButtonLabel.classList.add("buttonLabel");
    //accordionButtonLabel.setAttribute("for", data.checkboxId);
    accordionButtonLabel.textContent = data.title;

    if (
      this.categoryButtonMode.toLowerCase() !== "alwayson" &&
      this.categoryButtonMode.toLowerCase() !== "lookingfordefaultopen"
    ) {
      console.log(this.categoryButtonMode.toLowerCase());
      accordionButton.append(accordionButtonCheckbox);
    }
    accordionButton.append(accordionButtonLabel);
    accordionHeader.append(accordionButton);
    return accordionHeader;
  }

  generateCheckboxItem(_data, crruentCatId, contentsContainer, crruentCatColumn) {
    if (_data["parent-cat-id"] === crruentCatId) {
      if (_data["checkbox-type"] === "item") {
        var itemContainer = document.createElement("div");
        itemContainer.classList.add("form-check");
        if (crruentCatColumn === "2") {
          itemContainer.classList.add("TwoColumnItem");
        }
        itemContainer.append(document.getElementById(_data.checkboxId));
        var itemLabel = document.createElement("Label");
        itemLabel.classList.add("form-check-label");
        itemLabel.setAttribute("for", _data.checkboxId);
        itemLabel.textContent = _data.title;
        itemContainer.append(itemLabel);
        if (_data.hasOwnProperty("textboxId")) {
          itemContainer.append(document.getElementById(_data.textboxId));
        }
        contentsContainer.append(itemContainer);
      }
      if (_data["checkbox-type"] === "category") {
        // this.genreateEachGroupOfQuestion(contentPanel);
      }
    }
  }

  closeChildPanel(HTMLobj) {
    var allAccordionButton = [...HTMLobj.querySelectorAll("button.accordion-button")];
    var allPanelsStayOpen = [...HTMLobj.querySelectorAll("div.accordion-collapse")];
    allAccordionButton.forEach((button) => {
      button.classList.add("collapsed");
      button.setAttribute("aria-expanded", "false");
    });
    allPanelsStayOpen.forEach((div) => {
      div.classList.remove("show");
    });
  }

  uncheckChildCheckbox(HTMLobj) {
    var allChildChexbox = [...HTMLobj.querySelectorAll('input[type="checkbox"]')];
    var allChildTexbox = [...HTMLobj.querySelectorAll('input[type="text"]')];
    // console.log(allChildChexbox)
    allChildChexbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    allChildTexbox.forEach((texbox) => {
      texbox.value = "";
    });
  }

  appendToForm() {
    // console.log(this.targetQestionElement);
    this.targetQestionElement.closest("fieldset").append(this.questionContainer);
  }

  findChildCheckboxesByParentCatID(arrayOfParentCatId) {
    let checkboxLists = arrayOfParentCatId.map((array) => {
      return this.data
        .filter(
          (data) => data["parent-cat-id"] === array.toString() && data["checkbox-type"] === "item"
        )
        .map((data) => document.getElementById(data.checkboxId));
    });

    checkboxLists = checkboxLists.flat();
    return checkboxLists;
  }

  findCheckboxesByCatId(arrayOfCatId) {
    let checkboxLists = arrayOfCatId.map((array) => {
      return this.data
        .filter(
          (data) => data["cat-id"] === array.toString() && data["checkbox-type"] === "category"
        )
        .map((data) => document.getElementById(data.checkboxId));
    });

    checkboxLists = checkboxLists.flat();
    return checkboxLists;
  }
}

class questionData {
  #dataObj;

  constructor(targetQuestionId) {
    this.targetQuestionId = targetQuestionId;
  }

  get targetElements() {
    return [
      ...document.getElementById(this.targetQuestionId).querySelectorAll("span[checkbox-type]"),
    ];
  }

  get elementToDataObj() {
    this.#dataObj = this.targetElements.map((span) => {
      var rObj = {};
      rObj["checkbox-type"] = span.getAttribute("checkbox-type");

      if (span.getAttribute("seq") !== null) {
        rObj["seq"] = span.getAttribute("seq");
      }

      if (span.getAttribute("cat-id") !== null) {
        rObj["cat-id"] = span.getAttribute("cat-id");
      }

      if (span.getAttribute("parent-cat-id") !== null) {
        rObj["parent-cat-id"] = span.getAttribute("parent-cat-id");
      }

      // if (span.getAttribute("single-select") !== null) {
      //   rObj["single-select"] = span.getAttribute("single-select");
      // }

      if (span.getAttribute("single-select-group") !== null) {
        rObj["single-select-group"] = span.getAttribute("single-select-group");
      }

      if (span.getAttribute("texbox-contain") !== null) {
        rObj["texbox-contain"] = span.getAttribute("texbox-contain");
      }

      rObj["title"] = span.textContent;

      rObj["checkboxId"] = span
        .closest("td")
        .querySelector('input[type="checkbox"]')
        .getAttribute("id");

      if (span.closest("td").querySelector('input[type="text"]')) {
        rObj["textboxId"] = span
          .closest("td")
          .querySelector('input[type="text"]')
          .getAttribute("id");
      }

      if (span.getAttribute("column") !== null) {
        rObj["column"] = span.getAttribute("column");
      }

      if (span.getAttribute("items-direction") !== null) {
        rObj["items-direction"] = span.getAttribute("items-direction");
      }

      return rObj;
    });

    this.#dataObj = this.#dataObj.sort((a, b) => a.seq - b.seq);
    return this.#dataObj;
  }
}

//  function generateNewNOB(id) {

//  const nob = new noBQuestion(id);

// document
//   .getElementById(id)
//   .closest("fieldset")
//   .append(nob.questionContainer);

// }

// generateNewNOB("Question-8e1fd766-ffeb-46ca-8b6e-8ca6a12f097b__cboDataList");
//console.log(nob.questionContainer);

## Introduce:
This library purpose is build up a custom checkbox list UI to fulfil user requriement.




## reference:

### demo link:
https://form.hktdc.com/UI_RegistrationSite/Registration/RegistrationForm.aspx?FORMID=68b7147d-8c7b-4e42-a11d-3972f7e836c9&BYPASS=YES&LANGID=1&URLEVENTNAME=ALMAC2022&URLFORMNAME=Visitor+Pre-registration&URLDATESCODE=00
### question's data sample:<br>
[ALMAC2022_BM_testing.xlsx](https://github.com/LargeEagle/almac-nob/files/11220143/ALMAC2022_BM_testing.xlsx)

<br><br><br>


### screenshot(fontend):<br><br>

![image](https://user-images.githubusercontent.com/72810908/231704572-b0728834-5c6d-441c-850c-1dc6db9fafc3.png)

expended:<br>
![image](https://user-images.githubusercontent.com/72810908/231707640-13521060-970a-4e7c-9484-77703ba3e737.png)


### screenshot(backend):<br>
![image](https://user-images.githubusercontent.com/72810908/231709111-8b54b6b5-3a55-4b9b-a117-f3678affe22c.png)
![image](https://user-images.githubusercontent.com/72810908/231705042-8a0c1f9b-d6bb-4c3f-82ae-e7532bbd7157.png)
![image](https://user-images.githubusercontent.com/72810908/231708763-e3d2e880-a0af-46a6-9a8b-a928e69d6590.png)


### data sample:<br>
![image](https://user-images.githubusercontent.com/72810908/231707293-6a87e7f3-fc5b-44bb-b6bc-2684e1f37f4a.png)

<br><br>

## How to use:<br><br>

### 1.input question item:<br>



| Attributes |  | 
|----------|:-------------:|
checkbox-type="category"|make question item to question category<br>
cat-id="1" | assign a unique id for category<br>
seq="1" | set up element order<br>
items-direction="y" | set children element<br>
column="2" | set children element to 2 column<br>
single-select="true" | add this attributes to setup up single selection for children item<br>
parent-cat-id='1' | assign same id as cat-id to link up category and question id<br>
checkbox-type="item" | make question item to place question item direction to vertical<br><br>
 


#### code sample:
```
<span seq="1" checkbox-type='category' cat-id='1' single-select='true' column="2" items-direction="y">[C] <strong>User of Logistics Services</strong> <span id="nobUserOfLogistics"></span>
<span seq="2"  checkbox-type='item' parent-cat-id='1'>Distributor</span>
<span seq="3"  checkbox-type='item' parent-cat-id='1'>e-tailer</span>
<span seq="4"  checkbox-type='item' parent-cat-id='1'>Export Agent</span>
<span seq="5"  checkbox-type='item' parent-cat-id='1'>Exporter</span>
<span seq="6"  checkbox-type='item' parent-cat-id='1'>Import Agent</span>
<span seq="7"  checkbox-type='item' parent-cat-id='1'>Importer</span>
<span seq="8"  checkbox-type='item' parent-cat-id='1'>Manufacturer / Supplier</span>
<span seq="9"  checkbox-type='item' parent-cat-id='1'>Retailer</span>
<span seq="10"  checkbox-type='item' parent-cat-id='1'>Wholesaler</span>
<span seq="11"  checkbox-type='item' parent-cat-id='1'>Other (please specify)</span>
```


### 2.javascript: <br><br>



create a new object, noBQuestion takes two parameters, question id and type of category Button.<br><br>


sample:<br>
var LookingForNOB = new noBQuestion(LookingForNODid,"LookingForDefaultOpen");<br><br>



first parameter is a array of id<br>
second parameter is a string type, "defaultopen", "alwayson", "lookingfordefaultopen"<br>
"defaultopen" can set category question to expend by default<br>
"alwayson" can set category question alway expend<br>
"lookingfordefaultopen" can remove category question checkbox<br>







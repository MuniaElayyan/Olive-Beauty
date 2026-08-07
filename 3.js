let productName = document.getElementById("productName");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let shipping = document.getElementById("shipping");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let mood = "create";
let temp;

// هدول مشان بس نضيف الارقام في الجدول يكون زر المجموع يتفاعل مع الاعداد اول باول ويحكيلي كم صار المجموع حالية 

price.oninput = getTotal;
tax.oninput = getTotal;
shipping.oninput = getTotal;
discount.oninput = getTotal;

function getTotal(){

let result =
(+price.value || 0) + (+tax.value || 0) + (+shipping.value || 0) - (+discount.value || 0);
total.innerHTML = "Total: $" + result;
}


let dataProduct;
if(localStorage.product != null){
dataProduct = JSON.parse(localStorage.product);
}
else{
dataProduct = [];
}



// الاضافة والتحدييث
submit.onclick = function(){
let newProduct = {
productName: productName.value, price: price.value, tax: tax.value, shipping: shipping.value, discount: discount.value,
total: (+price.value || 0) + (+tax.value || 0) + (+shipping.value || 0) - (+discount.value || 0),
quantity: quantity.value, category: category.value
};


if(mood === "create"){
dataProduct.push(newProduct);
}

else{
dataProduct[temp] = newProduct;
mood = "create";
submit.innerHTML = "Add Product";
}


localStorage.product = JSON.stringify(dataProduct);
clearData();
showData();
}

//بس ندخل معلومات سجل كامل  يرجع الجدول يفضى حتى نقدر ندخل سجل اخر وهكذا 

function clearData(){
productName.value = "";
price.value = "";
tax.value = "";
shipping.value = "";
discount.value = "";
quantity.value = "";
category.value = "";
total.innerHTML = "Total: $0";
}

// هون انه يعرض المنتجات ومعلوماتها التي ادخلناها في جدول 

function showData(){
let table = "";
for(let i = 0; i < dataProduct.length; i++){
table += `
<tr>
<td>${i}</td>
<td>${dataProduct[i].productName}</td>
<td>${dataProduct[i].price}</td>
<td>${dataProduct[i].tax}</td>
<td>${dataProduct[i].shipping}</td>
<td>${dataProduct[i].discount}</td>
<td>${dataProduct[i].total}</td>
<td>${dataProduct[i].quantity}</td>
<td>${dataProduct[i].category}</td>
<td>
<button onclick="updateData(${i})"
class="update-btn bg-[#556B2F] text-white px-3 py-1 rounded-md">
Update
</button>
</td>

<td>
<button onclick="deleteData(${i})"
class="bg-red-600 text-white px-3 py-1 rounded-md">
Delete
</button>
</td>
</tr>
`;
}
tbody.innerHTML = table;
}

// هاي كبسة الحذف لعنصر واحد التي تكون جانب كل سطر 

function deleteData(i){
dataProduct.splice(i,1);
localStorage.product = JSON.stringify(dataProduct);
showData();
updateStats();
}




// كبسة تعديل منتج

function updateData(i){
productName.value = dataProduct[i].productName;
price.value = dataProduct[i].price;
tax.value = dataProduct[i].tax;
shipping.value = dataProduct[i].shipping;
discount.value = dataProduct[i].discount;
quantity.value = dataProduct[i].quantity;
category.value = dataProduct[i].category;
submit.innerHTML = "Update Product";
mood = "update";
temp = i;


let box = document.getElementById("productBox");
if(box){
box.scrollIntoView({ behavior:"smooth"});
}
}
// لما نفتح الويبسايت تكون البيانات من المرة السابقة معروضة تلقائيا 

showData();
updateStats();

// المنيوو للجوال

let menuBtn = document.getElementById("menuBtn");
let mobileMenu = document.getElementById("mobileMenu");
if(menuBtn){
menuBtn.addEventListener("click", function(){
mobileMenu.classList.toggle("hidden");
});
}


// هاد القسم لازرار البحث و التحديث والحذف 

search.onkeyup = function(){
let value = search.value.toLowerCase();
let table = "";
for(let i = 0; i < dataProduct.length; i++){
if(dataProduct[i].productName.toLowerCase().includes(value)){
table += `
<tr>
<td>${i}</td>
<td>${dataProduct[i].productName}</td>
<td>${dataProduct[i].price}</td>
<td>${dataProduct[i].tax}</td>
<td>${dataProduct[i].shipping}</td>
<td>${dataProduct[i].discount}</td>
<td>${dataProduct[i].total}</td>
<td>${dataProduct[i].quantity}</td>
<td>${dataProduct[i].category}</td>
<td>
<button onclick="updateData(${i})"
class="update-btn bg-[#556B2F] text-white px-3 py-1 rounded-md">
Update
</button>
</td>

<td>
<button onclick="deleteData(${i})"
class="bg-red-600 text-white px-3 py-1 rounded-md">
Delete
</button>
</td>
</tr>
`;
}
}
tbody.innerHTML = table;
}

function updateStats(){
 document.getElementById("productsCount").innerHTML = dataProduct.length;
let categories = [];
let quantityTotal = 0;
let inventory = 0;
for(let i = 0; i < dataProduct.length; i++){
 if(!categories.includes(dataProduct[i].category)){
     categories.push(dataProduct[i].category);
        }
 quantityTotal += Number(dataProduct[i].quantity) || 0;
 inventory += Number(dataProduct[i].price) * Number(dataProduct[i].quantity) || 0;
    }
 document.getElementById("categoryCount").innerHTML = categories.length;
 document.getElementById("quantityCount").innerHTML = quantityTotal;
document.getElementById("inventoryValue").innerHTML ="$" + inventory;
}


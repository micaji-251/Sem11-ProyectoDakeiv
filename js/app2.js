const shoppingBasketList = document.querySelector('#shoppingBasketList tbody');
const shoppingBasket = document.querySelector('#shoppingBasket');
const courseList = document.querySelector('#courseList');
let allCourseSelected = [];
const clearShoppingBasket = document.getElementById('clearShoppingBasket');


// console.log(shoppingBasketList);
// console.log(shoppingBasket);

// courseList.addEventListener('click',(e)=>{
//     console.log('event',e.target.dataset.id);
// })


loadListeners();

function loadListeners(){
    courseList.addEventListener('click',addCourseShoppingBasket);

}

function addCourseShoppingBasket(e){
    e.preventDefault();
    if(e.target.classList.contains('addShoppingBasket')){
        const courseSelected = e.target.parentElement.parentElement;
        readCoursetoShoppingBasket(courseSelected);
    }
}

function readCoursetoShoppingBasket(courseSelected){
    const dataCourseSelected = {
        image: courseSelected.querySelector('img').src,
        name: courseSelected.querySelector('h4').textContent,
        precio: courseSelected.querySelector('.precio span').textContent,
        quantity: 1,
        id:courseSelected.querySelector('.addShoppingBasket').getAttribute('data-id'),
    }
    
    // Con esta variable exist verificamos que al menos en una ocasión ya se ha agregado ese curso

    const exist = (allCourseSelected.some((course) => course.id === dataCourseSelected.id));

    // si exist es verdadero, vamos a modificar el quantity para agregarle uno, pero no se va a acumular el allCourseSelected

    if (exist){
        const allCourseSelectedFiltered = allCourseSelected.map( (course => { if(course.id === dataCourseSelected.id){
        course.quantity++;
        return course;
        } else {
            return course;
        }
    }))

    allCourseSelected  = [...allCourseSelectedFiltered];

    }else{
        allCourseSelected = [...allCourseSelected, dataCourseSelected];
    }  
    
    printCourseShoppingBasket(allCourseSelected);
}

function printCourseShoppingBasket(allCourseSelected){

    clearShoppingBasketList();

    allCourseSelected.forEach(course => {

        const row = document.createElement('tr');

        row.innerHTML=
        `
        <td> <img src='${course.image}'> </td>
        <td> ${course.name} </td>
        <td> ${course.quantity} </td>
        <td> ${course.precio} </td>
        <td> <a href=# class="deleteCourse" data-id="${course.id}">X</a></td>
        `;

        shoppingBasketList.appendChild(row);

    });
    
}

function clearShoppingBasketList(){
    shoppingBasketList.textContent='';
 
}

clearShoppingBasket.addEventListener('click', ()=>{
    clearShoppingBasketList();
    allCourseSelected=[];
})

shoppingBasketList.addEventListener('click', (e) =>{
    individualDelete(e)});

function individualDelete(e){
    e.preventDefault();
    if (e.target.classList.contains('deleteCourse')){
        const courseToDelete = e.target.parentElement.parentElement;
        const idToDelete = courseToDelete.querySelector('a').getAttribute('data-id');

        // Dentro del acumulador anterior borra ese objeto literario

        const indexDelete = allCourseSelected.findIndex(({id}) => id === idToDelete);
        
        allCourseSelected[indexDelete].quantity=0;

        allCourseSelected = allCourseSelected.filter((course) => course.id != idToDelete);
        courseToDelete.textContent='';
    }
}

let tbody=document.getElementById("tbody")
let filter_department=document.getElementById("filter_department")
let filter_gender=document.getElementById("filter_gender")
let filter_salary=document.getElementById("filter_salary")
let previous=document.getElementById("previous")
let next=document.getElementById("next")
let page=1;

 fetchData("",page,"")
 //pagination
previous.addEventListener("click",function(){
    page--
    fetchData("",page,"")
})
next.addEventListener("click",function(){
    page++
    fetchData("",page,"","")
})
async function fetchData(depart,page,gender,salary){
    tbody.innerHTML=""
   if(page==1){
    previous.style.display="none"
   }
   else{
    previous.style.display="block"
   }
// set URL on the basis of queryParams
    let URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`
    if(depart=="hr" || depart=="engineering" || depart=="operations" || depart=="finance" || depart=="marketing"){
        URL=URL+`&filterBy=department&filterValue=${depart}`
    }
    if(gender=="male" || gender=="female" || gender=="others"){
        URL=URL+`&filterBy=gender&filterValue=${gender}` //URL for filter the department
    }
     if(salary=="asc" || salary=="desc"){
        URL=URL+`&sort=salary&order=${salary}` //URL for sort the salary
    }
     if((gender=="male" || gender=="female" || gender=="others")&&(salary=="asc" || salary=="desc")){ 
        URL=URL+`&filterBy=gender&filterValue=${gender}&sort=salary&order=${salary}` //URL for filter gender and sort the salary
    }
    
    else{
        URL=URL
    }

    try {
        let response=await fetch(URL)
        let answer=await response.json()
     if(page==answer.data.length){ 
        next.style.display="none"
     }else{
        next.style.display="block"
     }
        displayData(answer.data)
    } catch (error) {
        console.log(error);
    }
}

//Dispay data on to the UI
function displayData(data){
      data.map((ele,index)=>{//map function for iterate on data 
        let tr=document.createElement('tr')
        let id=document.createElement('td')
        let name=document.createElement('td')
        let gender=document.createElement("td")
        let department=document.createElement("td")
        let salary=document.createElement("td")

        id.innerText=index+1
        name.innerText=ele.name
        gender.innerText=ele.gender
        department.innerText=ele.department
        salary.innerText=ele.salary

        tr.append(id,name,gender,department,salary)
        tbody.append(tr)     //append data on UI
      })
}
//event listner for filter the department
filter_department.addEventListener("click",function(){
       fetchData(filter_department.value,page,filter_gender.value,filter_salary.value)
})

//event listner for filter the gender
filter_gender.addEventListener("click",function(){
      fetchData(filter_department.value,page,filter_gender.value,filter_salary.value)
})

//event listner for sort the salary
filter_salary.addEventListener("click",function(){
     fetchData(filter_department.value,page,filter_gender.value,filter_salary.value);
})


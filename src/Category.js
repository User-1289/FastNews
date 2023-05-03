import React, {useState, useRef} from 'react'
import App from './App.js'
import './category.css'
export default function Category() {
    const spanRef = useRef(null);
    const [category, setCategory] = useState("")
    const [container, deleteContainer] = useState(false)
    const [catArr, setCatArr] = useState([])
    const setCatVal = (event) =>
    {
        setCategory(event.target.value)
    }
    const saveCategory = () => 
    {
       // alert(category);
        let newArr = [...catArr]
        newArr.push(category)
        setCatArr(newArr);
        getSelCat(category)
        setCategory("");
        document.getElementById("category-input").value = ""
    };

    async function getSelCat(catVal)
    {
        try
        {
            let responce = await fetch('/.netlify/functions/getdata', {
                method: 'POST',
                body: JSON.stringify({ newsVar: catVal}),
              })
                const data = await responce.json();
                console.log(data);
               return <App categoryData={data}/>
        }
        catch (error) {
            console.log(error);
          }
    }
    const delCategory = () =>
    {
        deleteContainer(true)
    }
    function displayCat()
    {
        const spanText = spanRef.current.getAttribute('val');
        getSelCat(spanText)
        //alert(spanText);
    }
        return (
            <div>
                <input id="category-input" onChange={setCatVal} />
                <span onClick={saveCategory} class="material-symbols-outlined">check_circle</span>
            <div><br/>
            {catArr.map((cat, index) => (
                <div>
                <span ref={spanRef} val={cat} onClick={displayCat} class="cat-txt" key={index}>{cat}</span>
                <span onClick={delCategory} class="material-symbols-outlined">delete</span>
                </div>
        ))}
        </div>
            </div>
          )
}

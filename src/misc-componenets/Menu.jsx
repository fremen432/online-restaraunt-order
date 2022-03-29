import React, { useState } from 'react';
import { sortedMenu } from '../Data';

function Dish(props) {
    const { dish, onAdd, page } = props;
    const dish_name_classes = 'grid grid-cols-4 '

    return (
      <>
        {/* <div className={"menu_item m-2 box p-2 pt-1 rounded-lg  " + (page =='HomePage' ? 'block ' : isHidden)}> */}
        <div className={"menu_item m-2 p-2 pt-1 rounded-lg  " }>
          <div className={dish_name_classes + " dish_name"} >
              <h3 className="text-lg col-start-1 col-span-3 ">{dish.name}</h3>
              <span id="price" className="text-sm col-start-4 col-span-1 text-center">{
              (dish.price !== '' ? '$' + dish.price : '')
              }</span>
          </div>
          <p className="text-sm">{dish.description}</p>
          {(dish.price == '' || page == 'HomePage' ? '' : <button onClick={() => onAdd(dish)} className="order_btn rounded-md px-2 py-1 mt-1 text-sm">Add to order</button>
          )}
        </div>
      </>
    );
}

function DishCategory(props) {
  const {categoryTitle, dishes, onAdd, page} = props;

  const [isHidden, setIsHidden] = useState('start')
  const toggleHidden = () => { 
    setIsHidden(
      isHidden == true ? false :
      isHidden == false ? true :
      true
      )
  }

  return(
    <div className={"box m-2 shadow-lg box rounded-lg "}>
    <h2 onClick={page =='HomePage' ? '' : toggleHidden} className={"OP_Menu_Title box text-center rounded-lg " + (page =='HomePage' ? '' : 'cursor-pointer ')}>{categoryTitle}</h2>
    <div className={"OP_Menu_Dishes box " + (
      page == 'HomePage' ? 'block' :

      isHidden == true ? 'roll_DOWN_animation ':
      isHidden == false ? 'roll_UP_animation ':
      'hidden'
    )}>
      {dishes.map(dish =>
        <Dish key={dish.id} dish={dish} onAdd={onAdd} page={page}/>
      )}
    </div>
  </div>
  )
}

export default function Menu(props) {
  const { onAdd, page } = props;

  return (
    <div id="Menu" className="
    OP_Body_Menu
    box 
    rounded-lg
    shadow-lg

    col-span-2 
    m-4">

      {/* Menu Categories */}
      <div className="
      grid xl:grid-cols-3 
      lg:grid-cols-2 
      md:grid-cols-1
      ">

        {/* Returns h1 with all category and respective menu items inside */}
        {sortedMenu.map(arr =>
          <DishCategory categoryTitle={arr[0].category} dishes={arr} onAdd={onAdd} page={page}/>
        )}

      </div>
    </div>
  )
}
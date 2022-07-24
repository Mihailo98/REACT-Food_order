import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const [isBadge, setIsBadge] = useState(false)

  const badgeCtx = useContext(CartContext)

  const numOfCartItems = badgeCtx.items.reduce((curNum, item) =>{
    return curNum + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${isBadge ? classes.bump : ''}`

  useEffect(() => {
    if(badgeCtx.items.length === 0){
      return
    }
    setIsBadge(true)
    
    const timer = setTimeout(() => {
      setIsBadge(false)
    }, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [badgeCtx.items])
  

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

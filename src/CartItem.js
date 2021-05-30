import React from 'react';

const CartItem = (props) => {

    
        const {price,title,qty} = props.product;
        const {
            product,
            onIncreaseQuantity,
            onDecreaseQuantity,
            onDeleteProduct
        } = props;
        return(
            <div className="cart-item">
                
                 <div className="left-block">
                    <img style={styles.image} src={product.img} />
                 </div>
                 <div className="right-block">
                    <div style = {{ fontSize: 25}}>{title}</div>
                    <div style = {{ color:'#777'}}>Rs {price}</div>
                    <div style = {{ color:'#777'}}>Qty: {qty}</div>
                  <div className="cart-item-actions">
                      {/* Buttons */}
                      <img alt="increase" 
                      className="action-icons" 
                      src="https://www.flaticon.com/svg/vstatic/svg/992/992651.svg?token=exp=1620456911~hmac=9a185dc076372fbaf3cd1d7a851c4ba5"
                      onClick ={() => onIncreaseQuantity(product)} />
                      <img alt="decrease" 
                      className="action-icons" 
                      src="https://www.flaticon.com/svg/vstatic/svg/992/992683.svg?token=exp=1620456867~hmac=713288e342d1b5615cc7f72d4b9a5e02" 
                      onClick = {() => onDecreaseQuantity(product)} />
                      <img alt="delete" 
                      className="action-icons" 
                      src="https://www.flaticon.com/svg/vstatic/svg/3096/3096687.svg?token=exp=1620457032~hmac=e1244224559efe5a006315a0cb89e548"
                      onClick = {() => onDeleteProduct(product.id)} />
                  </div>
                 </div>
            </div>
        );
    
}

const styles = {
    image: {
      height:110,
      width:110,
      borderRadius:4,
      background: '#ccc'
    }
} 

export default CartItem;
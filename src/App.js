import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
 this.state={
     products : [ ],
     loading : true
 }
 this.db = firebase.firestore();
//  this.testing();
}

componentDidMount(){
  // firebase.firestore().collection('products').get().then((snapshot) => {
  //   console.log(snapshot);

  //   snapshot.docs.map((doc) => {
  //     console.log(doc.data())
  //   });

  //   const products = snapshot.docs.map((doc) => {
  //     const data = doc.data();
  //     data['id'] = doc.id;
  //     return data;
  //   });

  //   this.setState({
  //     products:products,
  //     loading:false
  //   })
  // })


  this.db
  .collection('products')
  // .where('price','==',999)
  // .where('title','==','watch')
  .orderBy('price')
  .orderBy('price','desc')
  .onSnapshot((snapshot) => {
     console.log(snapshot);
  
    snapshot.docs.map((doc) => {
    console.log(doc.data())
    });
  
   const products = snapshot.docs.map((doc) => {
    const data = doc.data();
    data['id'] = doc.id;
    return data;
    });
  
    this.setState({
    products:products,
    loading:false
    })
  })
  
  
}

handleDecreaseQuantity = (product) => {
   console.log("Hey please decrease the quantity of",product);
   const {products} = this.state;
   const index = products.indexOf(product);

   if(products[index].qty  == 0){
     return;
   }

   const docRef = this.db.collection('products').doc(products[index].id);

   docRef.update({
     qty: products[index].qty - 1
   })
   .then(() => {
     console.log("Updated successfully");
   })
   .catch((error) => {
     console.log("Error is:",error);
   })
}

handleIncreaseQuantity = (product) => {
   console.log('Hey please inc the qty of ',product);
   const {products} = this.state;
   const index = products.indexOf(product);

  //  products[index].qty += 1;

  //  this.setState({
  //     products:products
  //  })

  const docRef = this.db.collection('products').doc(products[index].id);

  docRef.update({
    qty:products[index].qty + 1
  })
  .then(() => {
    console.log('Updated successfully')
  })
  .catch((error) => {
    console.log('Error: ',error);
  })
}

handleDeleteProduct = (id) => {
  const {products} = this.state;

  const docRef = this.db.collection('products').doc(id);

  docRef
  .delete()
  .then(() => {
    console.log('Deleted successfully')
  })
  .catch((error) => {
    console.log('Error: ',error);
  })
  
  //will return array of products which dont have id similiar to id given
  // const items =  products.filter((item) => item.id !== id); // [{}]

  // this.setState({
  //    products:items
  // })
}

getCartCount = () => {
  const {products} = this.state;

  let count = 0 ;
 
  products.forEach((product) => {
    count += product.qty;
  })

  return count;
}

getCartTotal = () => {
  const { products} = this.state;

  var total = 0;
  products.map(product => {
     total += ((product.qty)*(product.price));
     return '';
  }
  );

  return total;
}

addProduct = () => {
     this.db.collection('products').add({
       img:'',
       price:900,
       qty:3,
       title:'washing machine'
     })
     .then((docRef) => {
        console.log('Product has been added',docRef);
     })
     .catch((error) => {
       console.log('Error: ',error);
     })
}

  render(){
    const {products, loading} = this.state;
  return (
    <div className="App">
      <h1>Cart</h1>
      <Navbar count = {this.getCartCount()}/>
      {/* <button onClick={this.addProduct} style={{padding:20, fontSize:20}}>Add a Product</button> */}
      <Cart
       products = {products}
       onIncreaseQuantity = {this.handleIncreaseQuantity} 
       onDecreaseQuantity = {this.handleDecreaseQuantity}
       onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style= {{padding:10, fontSize:20}}>Total: {this.getCartTotal()}</div>
    </div>
  );
  }
}

export default App;

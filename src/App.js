import React from "react";
import { Rating } from "react-simple-star-rating";

class RecentlyViewed extends React.Component {
   state = {
      loading: true,
      loadingMsg: "loading related products...",
      transform: "translateX(0)",
      count: 0,
      productList: [],
      currentProduct: {},
   };

   addToLocal() {
      //some product on our page
      this.state.productList.push(this.state.currentProduct);
      localStorage.setItem("product", JSON.stringify(this.state.productList));
   }

   componentDidMount() {
      const products = localStorage.getItem("product");
      this.setState({ loading: false, productList: JSON.parse(products) });
      this.addToLocal();
   }

   render() {
      const starSettings = {
         allowHover: false,
         size: "18px",
         readonly: true,
         allowHalfIcon: false,
         fillColor: "#FF9900",
      };

      const moveRight = (e) => {
         if (this.state.count > -1400) {
            this.state.count += -400;
         }
         this.setState({ transform: `translateX(${this.state.count}px)` });
      };

      const moveLeft = (e) => {
         if (this.state.count < 0) {
            this.state.count += 400;
         }
         this.setState({ transform: `translateX(${this.state.count}px)` });
      };

      if (this.state.loading) {
         return <h1>{this.state.loadingMsg}</h1>;
      }
      return (
         <div className="recently-viewed">
            <h2>Products customers also bought</h2>
            <div className="carousel">
               <button id="prevBtn" onClick={moveLeft}>
                  &lt;
               </button>
               <div className="slider">
                  <div className="innerSlider" style={{ transform: `${this.state.transform}` }}>
                     {this.state.productList.map((product) => {
                        return (
                           <div className="productCard" key={product.id}>
                              <img id="pic" src={product.picture} />
                              <a id="name" href="#">
                                 {product.product_name}
                              </a>
                              <div>
                                 <Rating initialValue={Number(product.rating)} {...starSettings} />
                                 <u id="revNum">{product.reviews}</u>
                              </div>
                              <div id="price">${product.price}</div>
                              <div id="shipping">Prime FREE Delivery</div>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <button id="nextBtn" onClick={moveRight}>
                  &gt;
               </button>
            </div>
         </div>
      );
   }
}

export default RecentlyViewed;

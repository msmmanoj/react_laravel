import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../css/products.css'
import Cart from "./Cart";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: '',
            cartItems: [],
            totalPrice: 0,
            openCart: false,
        }
    }

    componentDidMount() {
        axios.get('/api/products').then((response) => {
            console.log(response.data);
            this.setState({
                products: response.data,
            })
        }).catch(() => {
            alert("Failed getting products data");
        })

        axios.get('/api/cartItems').then((response) => {
            console.log(response.data);
            const cartItems = response.data[0]?.cartItems;
            this.setCartItems((cartItems) ? cartItems : [])
        }).catch(() => {
            alert("Failed getting cart data");
        })
    }

    closeCart = () => {
        this.setState({openCart: false})
    }

    setCartItems = (items) => {
        var totalPrice = 0;
        totalPrice = items.reduce((acc, item) => {
            return acc = acc + (item.count * item.price);
        }, 0)
        this.setState({
            cartItems: items,
            totalPrice: totalPrice
        })
    }

    addToCart = (id, name, price) => {
        const cartItems = this.state.cartItems;
        const itemIndex = cartItems.findIndex(item => item.product_id === id)
        if (itemIndex !== -1) {
            cartItems[itemIndex].count++;
        } else {
            const item = {
                product_id: id,
                name: name,
                price: price,
                count: 1
            }
            cartItems.push(item);
        }
        console.log(cartItems);
        this.setCartItems(cartItems);
        this.updateBackendCart();
        alert('Product added to cart');
    }

    updateBackendCart = () => {
        const cartItems = this.state.cartItems;
        axios.post('/api/cartItems', cartItems).then((response) => {
        }).catch(() => {
            alert("Failed adding cart Items");
        })
    }

    incrementOrDecrementCartItem = (increment, id) => {
        const cartItems = this.state.cartItems;
        const itemIndex = cartItems.findIndex(item => item.product_id === id)
        console.log(cartItems, itemIndex, id);
        if (increment) {
            cartItems[itemIndex].count++;
        } else {
            if (cartItems[itemIndex].count === 1) {
                cartItems.splice(itemIndex, 1);
            } else {
                cartItems[itemIndex].count--;
            }
        }
        this.setCartItems(cartItems);
        this.updateBackendCart();
    }

    render() {
        const {products, search} = this.state;
        return (
            <div className="container">
                <div className="header">
                    <label>Product Search:
                        <input type="text" placeholder="Search ..." onChange={(event) => {
                            this.setState({search: event.target.value})
                        }}/>
                    </label>
                    <i className="fas fa-shopping-cart" onClick={() => this.setState({openCart: true})}> </i>
                </div>
                <br/><br/>
                <div className="products">
                    {
                        products.filter((product) => {
                            if (search === '') {
                                return product;
                            } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                                return product;
                            } else if (product.category[0].name.toLowerCase().includes(search.toLowerCase())) {
                                return product;
                            } else if (product.price <= parseFloat(search)) {
                                return product;
                            }
                        }).map((product, index) => {
                            return (
                                <div className="product" key={product.id}>
                                    <h3>{product.name}</h3>
                                    <p>{'₹' + product.price + ' /-'}</p>
                                    <p>{product.category[0].name}</p>
                                    <button className="btn btn-success"
                                            onClick={() => this.addToCart(product.id, product.name, product.price)}
                                    >Add to Cart
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <Cart
                    openCart={this.state.openCart}
                    closeCart={this.closeCart}
                    items={this.state.cartItems}
                    totalPrice={this.state.totalPrice}
                    incrementOrDecrementCartItem={(status, id) => this.incrementOrDecrementCartItem(status, id)}
                />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

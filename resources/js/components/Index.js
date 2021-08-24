import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: ''
        }
    }

    componentDidMount() {
        axios.get('/api/products').then((response) => {
            console.log(response.data);
            this.setState({
                products: response.data,
            })
        }).catch(() => {
            alert("Failed getting response");
        })
    }

    render() {
        const {products, search} = this.state;
        return (
            <div className="container" style={{color:"black"}}>
                <input type="text" placeholder="Search ..." onChange={(event) => {
                    this.setState({search: event.target.value})
                }}/>
                <br/><br/>
                <table style={{width:"100%"}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.filter((product) => {
                            console.log(search)
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
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category[0].name}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

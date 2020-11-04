const CART = {
            KEY: 'bkasjbdfkjasdkfjhaksdfjskd',
            contents: [],
            init(){
                //check localStorage and initialize the contents of CART.contents
                let _contents = localStorage.getItem(CART.KEY);
                if(_contents){
                    CART.contents = JSON.parse(_contents);
                }else{
                    //dummy test data
                    CART.contents = [];
                    CART.sync();
                }
            },
            async sync(){
                let _cart = JSON.stringify(CART.contents);
                await localStorage.setItem(CART.KEY, _cart);
            },
            find(id){
                //find an item in the cart by it's id
                let match = CART.contents.filter(item=>{
                    if(item.id == id)
                        return true;
                });
                if(match && match[0])
                    return match[0];
            },
            add(id){
                //add a new item to the cart
                //check that it is not in the cart already
                if(CART.find(id)){
                    CART.increase(id, 1);
                }else{
                    let arr = PRODUCTS.filter(product=>{
                        if(product.id == id){
                            return true;
                        }
                    });
                    if(arr && arr[0]){
                        let obj = {
                            id: arr[0].id,
                            title: arr[0].title,
                            qty: 1,
                            itemPrice: arr[0].price
                        };
                        CART.contents.push(obj);
                        //update localStorage
                        CART.sync();
                    }else{
                        //product id does not exist in products data
                        console.error('Invalid Product');
                    }
                }
            },
            increase(id, qty=1){
                //increase the quantity of an item in the cart
                CART.contents = CART.contents.map(item=>{
                    if(item.id === id)
                        item.qty = item.qty + qty;
                    return item;
                });
                //update localStorage
                CART.sync()
            },
            reduce(id, qty=1){
                //reduce the quantity of an item in the cart
                CART.contents = CART.contents.map(item=>{
                    if(item.id === id)
                        item.qty = item.qty - qty;
                    return item;
                });
                CART.contents.forEach(async item=>{
                    if(item.id === id && item.qty === 0)
                        await CART.remove(id);
                });
                //update localStorage
                CART.sync()
            },
            remove(id){
                //remove an item entirely from CART.contents based on its id
                CART.contents = CART.contents.filter(item=>{
                    if(item.id !== id)
                        return true;
                });
                //update localStorage
                CART.sync()
            },
            empty(){
                //empty whole cart
                CART.contents = [];
                //update localStorage
                CART.sync()
            },
            sort(field='title'){
                //sort by field - title, price
                //return a sorted shallow copy of the CART.contents array
                let sorted = CART.contents.sort( (a, b)=>{
                    if(a[field] > b[field]){
                        return 1;
                    }else if(a[field] < a[field]){
                        return -1;
                    }else{
                        return 0;
                    }
                });
                return sorted;
                //NO impact on localStorage
            },
            logContents(prefix){
                console.log(prefix, CART.contents)
            }
        };
        
        let PRODUCTS = [{
    "id":123,
    "title":"Bell",
    "desc":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "img":"bell-lg.png",
    "price":12.34
},{
    "id":456,
    "title":"Bullhorn",
    "desc":"Quisquam, veritatis, officia. Veritatis, saepe!",
    "img":"bullhorn-lg.png",
    "price":43.21
},{
    "id":789,
    "title":"Clock",
    "desc":"Fugit dolorum consequatur rem molestiae, possimus dignissimos!",
    "img":"clock-lg.png",
    "price":45.67
},{
    "id":987,
    "title":"Cog",
    "desc":"Fugit dolorum consequatur rem molestiae, possimus dignissimos!",
    "img":"cog-lg.png",
    "price":78.90
},{
    "id":654,
    "title":"Phone",
    "desc":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "img":"iphone-lg.png",
    "price":76.54
},{
    "id":321,
    "title":"Lightbulb",
    "desc":"Earum deleniti modi dolore cum, animi minima, saepe placeat, debitis mollitia veniam.",
    "img":"lightbulb-alt-on-lg.png",
    "price":23.45
}];
        
        document.addEventListener('DOMContentLoaded', ()=>{
            //when the page is ready
        showProducts(PRODUCTS);
        //get the cart items from localStorage
            CART.init();
            //load the cart items
            showCart();
        });
        



        function checkoutform(){
        
                    
                        let sum=0
                        let message=""
            let s = CART.sort('qty');
            s.forEach( item =>{
                        sum+=item.qty * item.itemPrice;
 
                        
        message=message.concat(item.title);
        message=message.concat("-");
        message=message.concat(item.qty);
        message=message.concat("????");                
            })
                    let cost = new Intl.NumberFormat('en-CA',{style: 'currency', currency:'CAD'}).format(sum);
                    message=message.concat(cost);
                    console.log(message);
                    var loginForm = document.forms.form1; 
                    loginForm.elements.message.placeholder = message;
                    
                    
                    
        
        }
        function showCart(){
            let cartSection = document.getElementById('cart');
            cart.innerHTML = '';
            let sum=0
            let s = CART.sort('qty');
            s.forEach( item =>{
                let cartitem = document.createElement('div');
                cartitem.className = 'cart-item';
                
                
                sum+=item.qty * item.itemPrice;
                        
                
                
                                
                               
                
                
                
                
                
                
                
                
                let title = document.createElement('h3');
                title.textContent = item.title;
                title.className = 'title'
                cartitem.appendChild(title);
                
                let controls = document.createElement('div');
                controls.className = 'controls';
                cartitem.appendChild(controls);
                
                let plus = document.createElement('span');
                plus.textContent = '+';
                plus.setAttribute('data-id', item.id)
                controls.appendChild(plus);
                plus.addEventListener('click', incrementCart)
                
                let qty = document.createElement('span');
                qty.textContent = item.qty;
                controls.appendChild(qty);
                
                let minus = document.createElement('span');
                minus.textContent = '-';
                minus.setAttribute('data-id', item.id)
                controls.appendChild(minus);
                minus.addEventListener('click', decrementCart)
                
                
                let price = document.createElement('div');
                price.className = 'price';
               
                let cost1 = new Intl.NumberFormat('en-CA',{style: 'currency', currency:'CAD'}).format(item.qty * item.itemPrice);
                price.textContent = cost1;
                cartitem.appendChild(price);
                
                
                
                
                
                
                
                
                cartSection.appendChild(cartitem);
                
                
                
                
            })
            
            
                let total= document.createElement('h3');
                let cost = new Intl.NumberFormat('en-CA',{style: 'currency', currency:'CAD'}).format(sum);
                total.textContent = 'TOTAL AMOUNT IS'.concat(cost);
                total.className = 'title'
            cartSection.appendChild(total);
            
            
            
            
        }
        
        function incrementCart(ev){
            ev.preventDefault();
            let id = parseInt(ev.target.getAttribute('data-id'));
            CART.increase(id, 1);
            let controls = ev.target.parentElement;
            let qty = controls.querySelector('span:nth-child(2)');
            let item = CART.find(id);
            if(item){
                qty.textContent = item.qty;
            }else{
                document.getElementById('cart').removeChild(controls.parentElement);
            }
            showCart();
        }
        
        function decrementCart(ev){
            ev.preventDefault();
            let id = parseInt(ev.target.getAttribute('data-id'));
            CART.reduce(id, 1);
            let controls = ev.target.parentElement;
            let qty = controls.querySelector('span:nth-child(2)');
            let item = CART.find(id);
            if(item){
                qty.textContent = item.qty;
            }else{
                document.getElementById('cart').removeChild(controls.parentElement);
            }
            showCart();
        }
        
        function showProducts( products ){
            PRODUCTS = products;
            //take data.products and display inside <section id="products">
            let imgPath = '';
            let productSection = document.getElementById('products');
            productSection.innerHTML = "";
            products.forEach(product=>{
                let card = document.createElement('div');
                card.className = 'card';
                //add the image to the card
                let img = document.createElement('img');
                img.alt = product.title;
                img.src = imgPath + product.img;
                card.appendChild(img);
                //add the price
                let price = document.createElement('p');
                let cost = new Intl.NumberFormat('en-CA', 
                                        {style:'currency', currency:'CAD'}).format(product.price);
                price.textContent = cost;
                price.className = 'price';
                card.appendChild(price);
                
                //add the title to the card
                let title = document.createElement('h2');
                title.textContent = product.title;
                card.appendChild(title);
                //add the description to the card
                let desc = document.createElement('p');
                desc.textContent = product.desc;
                card.appendChild(desc);
                //add the button to the card
                let btn = document.createElement('button');
                btn.className = 'btn';
                btn.textContent = 'Add Item';
                btn.setAttribute('data-id', product.id);
                btn.addEventListener('click', addItem);
                card.appendChild(btn);
                //add the card to the section
                productSection.appendChild(card);
            })
        }
        
        function addItem(ev){
            ev.preventDefault();
            let id = parseInt(ev.target.getAttribute('data-id'));
            console.log('add to cart item', id);
            CART.add(id, 1);
            showCart();
        }

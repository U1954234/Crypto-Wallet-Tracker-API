function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
 
    // we'll store the parameters here
    var obj = {};
 
    // if query string exists
    if (queryString) {
       // stuff after # is not part of query string, so get rid of it
       queryString = queryString.split("#")[0];
 
       // split our query string into its component parts
       var arr = queryString.split("&");
 
       for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split("=");
 
          // set parameter name and value (use 'true' if empty)
          var paramName = a[0];
          var paramValue = typeof a[1] === "undefined" ? true : a[1];
 
          // (optional) keep case consistent
          paramName = paramName
          if (typeof paramValue === "string")
             paramValue = paramValue
 
          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {
             // create key if it doesn't exist
             var key = paramName.replace(/\[(\d+)?\]/, "");
             if (!obj[key]) obj[key] = [];
 
             // if it's an indexed array e.g. colors[2]
             if (paramName.match(/\[\d+\]$/)) {
                // get the index value and add the entry at the appropriate position
                var index = /\[(\d+)\]/.exec(paramName)[1];
                obj[key][index] = paramValue;
             } else {
                // otherwise add the value to the end of the array
                obj[key].push(paramValue);
             }
          } else {
             // we're dealing with a string
             if (!obj[paramName]) {
                // if it doesn't exist, create property
                obj[paramName] = paramValue;
             } else if (obj[paramName] && typeof obj[paramName] === "string") {
                // if property does exist and it's a string, convert it to an array
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
             } else {
                // otherwise add the property
                obj[paramName].push(paramValue);
             }
          }
       }
    }
 
    return obj;
 }
 
 const app = Vue.createApp({
    data: () => ({
      user_details: null,
      page_loading:true,
      transactions:null,
      transaction_details:{},
      transfer_crypt:{
        amount:"",type:'SELL',address:""
      },
      wallet:{}
    }),
    methods: {
        add_wallet:async function (){
            let self = this
            const token = localStorage.getItem('token');
            const requestOptions = {
        method: 'POST',
        body:JSON.stringify(this.wallet),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        };

        fetch(url('user/add-wallet'), requestOptions)
        .then(response => {
            if (!response.ok) {
                self.logout();
                Toast.fire({
                    icon: 'error',
                    title: 'Network response was not ok'
                });
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            if (data.status) {
                self.wallet = {}
                self.get_user_details()
                Toast.fire({
                    icon: 'success',
                    title: data.message
                });
            } else {
                if (data.statusCode == 401) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Session expired'
                    });
                    self.logout()
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: data.message
                    });
                }
            }
        })
        .catch(error => {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        });

        },
        transfer_crypto: async function(){
            let self = this
            const token = localStorage.getItem('token');
            const requestOptions = {
        method: 'POST',
        body:JSON.stringify(this.transfer_crypt),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        };

        fetch(url('user/add-transaction'), requestOptions)
        .then(response => {
            if (!response.ok) {
                self.logout();
                Toast.fire({
                    icon: 'error',
                    title: 'Network response was not ok'
                });
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            if (data.status) {
                self.transfer_crypt = {}
                Toast.fire({
                    icon: 'success',
                    title: data.message
                });
            } else {
                if (data.statusCode == 401) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Session expired'
                    });
                    self.logout()
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: data.message
                    });
                }
            }
        })
        .catch(error => {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        });

        },
        get_transaction_details:async function(){
            let self = this
            const token = localStorage.getItem('token'); // Replace with your actual authorization token

        const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        };

        fetch(url('user/transactions'), requestOptions)
        .then(response => {
            if (!response.ok) {
                self.logout();
                Toast.fire({
                    icon: 'error',
                    title: 'Network response was not ok'
                });
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            if (data.status) {
                self.transactions = data.data
                self.page_loading = false
            } else {
                if (data.statusCode == 401) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Session expired'
                    });
                    self.logout()
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: data.message
                    });
                }
            }
        })
        .catch(error => {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        });

        },
        get_user_details:async function(){
            let self = this
            const token = localStorage.getItem('token'); // Replace with your actual authorization token

        const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        };

        fetch(url('user/user-details'), requestOptions)
        .then(response => {
            if (!response.ok) {
                self.logout();
                Toast.fire({
                    icon: 'error',
                    title: 'Network response was not ok'
                });
            }
            return response.json();
        })
        .then(data => {
            // Process the fetched data
            if (data.status) {
                self.user_details = data.data
                self.page_loading = false
            } else {
                if (data.statusCode == 401) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Session expired'
                    });
                    self.logout()
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: data.message
                    });
                }
            }
        })
        .catch(error => {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        });

        },
        logout_user:async function(event){
         event.preventDefault()
         localStorage.removeItem('token')
         location.href = "../login.html"
       },
       logout:function(){
         localStorage.removeItem('user_token')
         location.href = "../login.html"
       },
    
    },
    
    beforeMount() {
        const access_token = localStorage.getItem("token")
            if (access_token && access_token !== null) {
               this.get_user_details();
               this.get_transaction_details()
              }else{
                location.href = "../login.html"
              }
              
    },
    mounted() {
        
        
    },
 });
 app.mount("#app");
 
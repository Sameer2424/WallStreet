
import { createContext } from 'react';
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: (username:string, password:string) => { 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password:password})
    
        };
        fetch('/api/auth/login', requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (response.status != 200) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
    
                    return Promise.reject(error);
                }
    
                return ({userToken:data.accessToken, role:data.role} );
    
            })
            .catch(error => {
                alert('There was an error!' +  error.toString());
                return ({ errorMessage: error.toString() });
            });
    
     
    },

    logout: () => {}
});
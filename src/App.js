// App.js
import React, { useState, useEffect } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { useNavigate } from 'react-router-dom';
import oktaConfig from './oktaConfig';

function App() {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

    // Crear una instancia de OktaAuth
    const oktaAuth = new OktaAuth({
        clientId: oktaConfig.clientId,
        issuer: oktaConfig.issuer,
        redirectUri: oktaConfig.redirectUri,
        scopes: oktaConfig.scopes,
        pkce: true,
        responseType: 'code',
    });

    // Redirigir al usuario a Okta para autenticarse
    const login = async () => {
        try {
            await oktaAuth.signInWithRedirect();
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    // Manejar la respuesta del servidor de Okta después del login
    useEffect(() => {
        const handleAuthCode = async () => {
            if (window.location.href.includes('code=')) {
                try {
                    const tokens = await oktaAuth.token.parseFromUrl();
                    const { accessToken, idToken } = tokens;

                    setToken(accessToken); // Almacena el token
                    setError(null); // Limpia cualquier error

                    // Redirigir al usuario a la página principal después del login
                    navigate('/'); // Usa navigate en lugar de history.push
                } catch (err) {
                    setError('Error parsing tokens: ' + err.message);
                }
            }
        };

        handleAuthCode();
    }, [navigate, oktaAuth]); // Usa 'navigate' en las dependencias del useEffect

    return (
        <div style={{ padding: '20px' }}>
            <h1>Okta Login</h1>
            {!token ? (
                <button onClick={login}>Login with Okta</button>
            ) : (
                <div>
                    <h3>Access Token:</h3>
                    <textarea
                        style={{ width: '100%', height: '100px' }}
                        value={token.accessToken.value}
                        readOnly
                    />
                </div>
            )}

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default App;

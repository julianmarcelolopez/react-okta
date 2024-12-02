// const oktaConfig = {
//     clientId: '0oam1lggvy9VQVacg697',
//     clientSecret: 'catRiREPdJWGxEGkzohYM0E8vy-kkeADCoklC5iV6EEcIfEajNfRJBL6JwMqPgNX', // Opcional si se usa directamente en el backend.
//     issuer: 'https://trial-2865463.okta.com/oauth2/default',
//     tokenEndpoint: '/v1/token', // Ruta de Okta para obtener el token.
// };
//
// export default oktaConfig;
const oktaConfig = {
    clientId: '0oam1lggvy9VQVacg697',
    issuer: 'https://trial-2865463.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback', // Tu redirección
    scopes: ['openid', 'profile', 'email'],
    pkce: true, // Habilitar PKCE
    responseType: 'code', // Authorization Code Flow
};

export default oktaConfig;
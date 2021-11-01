set PRIVATE_KEY=key.pem
set CERT_REQ=certreq.csr
set CERT=cert.pem

echo "FOR PYTHON AND NODE SERVER"
cd "./config/ssl"
openssl genrsa -out %PRIVATE_KEY% 1024 
openssl req -new -key %PRIVATE_KEY% -out %CERT_REQ%
openssl x509 -req -days 365  -in %CERT_REQ% -signkey %PRIVATE_KEY% -out %CERT%
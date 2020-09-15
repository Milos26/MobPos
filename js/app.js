if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('  sw.js')
                    .then(registration => console.log('registrovan SW'))
                    .catch(err => 'Nije registrovan SW')              
            } else {
                console.log("Ne postoji podrska za sw");
            }
            
 if (navigator.onLine==false) {
  alert("Niste povezani na mrežu, prikazuju se keširani podaci.")
}       
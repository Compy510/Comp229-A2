/*FileName: app.js
Author: Arshad Khan
Student#: 301180776
Date: October 22*/
// IIFE -- Immediately Invoked Function Expression
(function(){
    function start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (Event)=>{
                if(!confirm("Are you sure?")) 
                {
                    Event.preventDefault();
                    window.location.assign('/contacts-list');
                }
            });
        }
    }

    window.addEventListener("load", start);

})();
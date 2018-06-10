 var ul = document.querySelector('ul');
        var input = document.querySelector('input');
        var button = document.querySelector('button');
        
        var initialTodos = ['Buy bread', 'Send an invoice'];
        var i;        

        for (i = 0; i < initialTodos.length; i++) {
         var span = document.createElement('button');
         var txt = document.createTextNode('delete');
         span.className = 'delete';
         span.appendChild(txt);
         initialList[i].appendChild(span);
        
        
        }
        
        for (i = 0; i < initialList.length; i++) {
         var span = document.createElement('button');
         var txt = document.createTextNode('edit');
         span.className = 'edit';
         span.appendChild(txt);
         initialList[i].appendChild(span);
        }
            
        


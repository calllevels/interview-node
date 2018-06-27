$(document).ready(function(){
   const FIXER_BASE_URL = 'http://data.fixer.io/api/';
   const LATEST = 'latest';
   const FIXER_API_KEY = 'd520cb6bf8f11c009a94d4ce94e92deb';
   const FIXER_GET_LATEST = FIXER_BASE_URL + LATEST + `?access_key=${FIXER_API_KEY}`;
   const FIXER_SYMBOLS = FIXER_GET_LATEST + '&symbols=';
   const BASE_URL = 'http://localhost:5000';
   const LEVEL_URL = '/api/levels';
   const COUNT_URL = '/count';
   const BASE_LEVEL_URL = BASE_URL + LEVEL_URL;

   const MAX_TOTAL_LEVEL = 5;
   $.get(FIXER_GET_LATEST)
    .then(function(response){
     
        if(response.success){
            $.each(response.rates,function(k,v){
               $('#ratesContainer').append(
                   `<div class="rate-box">
                        <h1>${k}</h1>
                        <h4>${v}</h4>
                    </div>`
               )
            })
        }
    });

    
   setTimeout(function(){
   
    $('.oi-list').click();
   },1)

   $('#ratesContainer').on('click', '.rate-box',function(){
       let exchangeSymbol = $(this).children('h1').text();
       let exchangeRate = $(this).children('h4').text()
       $('#ratesContainer .rate-box').removeClass('active');
       $(this).addClass('active');

       
       $('.vs-currency').text(exchangeSymbol);
       $('.exchange-rate').text(exchangeRate);

       $('.form-add-edit').show();
       $('.list-level').hide();
       $('#baseCurrency').val('EUR');
       $('#exchangeCurrency').val(exchangeSymbol);
       $('#level').val('');
       $('#btnSubmit').text('Submit');

   });

   $('#btnSubmit').click(function(){
       let level = {
           id:$('#itemID').val(),
           baseCurrency:$('#baseCurrency').val(),
           exchangeCurrency:$('#exchangeCurrency').val(),
           level:parseFloat($('#level').val())
       }
       
       if($(this).text().toUpperCase() !== 'EDIT'){
            $.get(BASE_LEVEL_URL + COUNT_URL)
                .done(function(response){
                     if(response.data < MAX_TOTAL_LEVEL){
                        $.post(BASE_LEVEL_URL,level)
                            .done(function(response){
                                if(response.status == 200){
                                    $('.oi-list').click();    
                                }
                            })
                     }else{
                         setTimeout(function(){
                            // $(".alert").delay(4000).slideUp(200, function() {
                            //     $(this).alert('close');
                            // });
                            $(".alert").fadeTo(2000, 500).slideUp(500, function(){
                                $(".alert").slideUp(500);
                            });
                         },1)
                        
                     }
                })

            
        
       }else{
        
        $.ajax({
            url: BASE_LEVEL_URL + '/' + level.id,
            type: 'PUT',
            data:level,
            success: function(response) {
               
                if(response.status === 200){
                    $('.oi-list').click();
                }
            }
        });
       }
   })

   $('.list-level').on('click','.oi-trash',function(){
    let level = {
        id:$($(this).prev().children('span.d-none')[0]).text()   
    }

    $.ajax({
        url: BASE_LEVEL_URL + '/' + level.id,
        type: 'DELETE',
        success: function(response) {
           
            if(response.status === 200){
                $('.oi-list').click();
            }
        }
    });
   
   })

   $('.oi-list').click(function(){
    $('#setLevelsModal .modal-body').empty();
       $.get(BASE_LEVEL_URL)
        .done(function(response){
            
            $('.form-add-edit').attr('style','display:none !important');
            $('.list-level').show();
            $('.list-level').empty();
            $.each(response.data,function(k,v){
                $.get(FIXER_SYMBOLS + v.exchangeCurrency)
                    .done(function(response){
                        
                        if(response.success){
                          
                            let savedLevelAlert = response.rates[v.exchangeCurrency].toString() === v.level ? 'list-item-notify' : '';
                            $('.list-level').append(`
                                <div class="list-item ${savedLevelAlert}">
                                    <div class="edit-item d-flex flex-column justify-content-center align-items-center">
                                        <span class="d-none">${v.id}</span>
                                        <h1>${v.baseCurrency} vs ${v.exchangeCurrency}</h1>
                                        <span>${v.level}</span>
                                    </div>
                                    <span class="oi oi-trash w-100 text-center"></span>
                                </div>
                            `)

                            if(savedLevelAlert !== ''){
                               $('#setLevelsModal .modal-body').append(`<div>
                                                                            <h5 class="d-inline">${v.baseCurrency} vs ${v.exchangeCurrency}</h5> 
                                                                            <span>${v.level}</span>
                                                                        </div>`)
                            }
                        }
                    })
               
            })
        
            setTimeout(function(){
                if($('#setLevelsModal .modal-body div').children('h5').length > 0){
                    $('#setLevelsModal').modal('show');
                }
            },1000)
        })
   })

   $('.list-level').on('click','.edit-item',function(){        
        $('.form-add-edit').show();
        $('.list-level').hide();
        $('#itemID').val($(this).children('span').first().text());
        $('#baseCurrency').val('EUR');
        $('#exchangeCurrency').val($(this).children('h1').text().split('vs')[1].trim());
        $('#level').val(parseFloat($(this).children('span').last().text()));       
        $('#btnSubmit').text('Edit');
   })


});
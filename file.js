$tablefun = function(item)
{
 $('#content').append('\
	        						<tr class="set"><td class="id">'+item.id+'</td>\
	                                <td class="name">'+item.name+'</td>\
	                                <td class="gender">'+item.gender+'</td>\
	                                <td class="company">'+item.company+'</td>\
	                                <td class="email">'+item.email+'</td>\
	                                <td class="phone">'+item.phone+'</td>\
	                                <td><button class="editbtn">Edit</button>\
	                                </td>\
	                                </tr>\
	                            	');
}
$(function(){
    var count=0;
    var flag = 0;
	var tbody1 = $('#content');
    tbody1.html('');

//Search 

	$('#search').on('click', function(e) {
		e.preventDefault();
            flag = 0;
	        var linkInput = $('#input1').val();
	        var link = 'http://localhost:3000/people/?name=' + linkInput;


	        $.ajax({

	            type: 'GET',
	            url: link,

	            success: function(link) {
	                if (count === 0) {

	                        $.each(link,function (index,item) {
	              //           	tbody1.append('\
	        						// <tr class="set"><td class="id">'+item.id+'</td>\
	              //                   <td class="name">'+item.name+'</td>\
	              //                   <td class="gender">'+item.gender+'</td>\
	              //                   <td class="company">'+item.company+'</td>\
	              //                   <td class="email">'+item.email+'</td>\
	              //                   <td class="phone">'+item.phone+'</td>\
	              //                   <td><button class="editbtn">Edit</button>\
	              //                   </td>\
	              //                   </tr>\
	              //               	');
	              $tablefun(item);
	                            count++;

	                        });
	                }
	            }

	        });


	    });

    //empty all
	   $('#input1').on('click', function() {
	        $('#content').empty();
	        $('#input1').val("");
	        count = 0;
	    });

	   $('#reset').on('click', function() {
	        $('#inputId').val("");
	        $('#inputName').val("");
	        $('#inputGender').val("");
	        $('#inputCompany').val("");
	        $('#inputEmail').val("");
	        $('#inputPhone').val("");
	    });

	//All data

		$('#show').on('click', function(e) {
		e.preventDefault();
            flag = 1;
	        var link = 'http://localhost:3000/people';


	        $.ajax({

	            type: 'GET',
	            url: link,

	            success: function(link) {
	                if (count === 0) {

	                        $.each(link,function (index,item) {
	                        	tbody1.append('\
	        						<tr class="set"><td class="id">'+item.id+'</td>\
	                                <td class="name">'+item.name+'</td>\
	                                <td class="gender">'+item.gender+'</td>\
	                                <td class="company">'+item.company+'</td>\
	                                <td class="email">'+item.email+'</td>\
	                                <td class="phone">'+item.phone+'</td>\
	                                <td><button class="editbtn">Edit</button>\
	                                </td>\
	                                </tr>\
	                            	');
	                            count++;

	                        });
	                }
	            }

	        });


	    });
        
        //Post

        $('#Add').on('click', function(e) {
		e.preventDefault();

		var link = 'http://localhost:3000/people';
		var ID = $('#inputId').val();
		var NAME = $('#inputName').val();
		var GENDER = $('#inputGender').val();
		var COMPANY = $('#inputCompany').val();
		var EMAIL = $('#inputEmail').val();
		var PHONE = $('#inputPhone').val();

		var employee = {
						id : ID,
						name : NAME,
						gender : GENDER,
						company : COMPANY,
						email : EMAIL,
						phone : PHONE
					};


			$.ajax({
				url:link,
				method:'POST',
				data:employee,

				success:function(Addemployee){
					tbody1.append('\
	        						<tr class="set"><td class="id">'+Addemployee.id+'</td>\
	                                <td class="name">'+Addemployee.name+'</td>\
	                                <td class="gender">'+Addemployee.gender+'</td>\
	                                <td class="company">'+Addemployee.company+'</td>\
	                                <td class="email">'+Addemployee.email+'</td>\
	                                <td class="phone">'+Addemployee.phone+'</td>\
	                                <td><button class="editbtn">Edit</button>\
	                                </td>\
	                                </tr>\
	                            	');
					          $('#show').click();
				}

			});
	    });

         //Delete

         $('#table2').on('click','.deletebtn',function(e) {
		e.preventDefault();
		console.log('hello');
         var currentlin = $(this).closest("tr");
		  var id = currentlin.find('.id').val();

		 $.ajax({
		type:'DELETE',
		url:'http://localhost:3000/people/'+id,
		success:function(){
			currentlin.remove();
			location.reload();
		}

         });

        });

	    //Update
        
        $('#table2').on('click','.updatebtn',function(e) {
		e.preventDefault();
         var currentlin = $(this).closest("tr");
		  var id = currentlin.find('.id').val();

		var edited={
		id:currentlin.find('input.id').val(),
		name:currentlin.find('input.name').val(),
		gender:currentlin.find('input.gender').val(),
		company:currentlin.find('input.company').val(),
		email:currentlin.find('input.email').val(),
		phone:currentlin.find('input.phone').val(),
		};

		console.log(edited);

		 $.ajax({
		type:'PUT',
		url:'http://localhost:3000/people/'+id,
		data: edited,
		success:function(data){
			                   
			                 tbody1.html('\
	        						<tr><td><input type="text" class="id" value="'+data.id+'"></td>\
	                                <td><input type="text" class="name" value="'+data.name+'"></td>\
	                                <td><input type="text" class="gender" value="'+data.gender+'"></td>\
	                                <td><input type="text" class="company" value="'+data.company+'"></td>\
	                                <td><input type="text" class="email" value="'+data.email+'"></td>\
	                                <td><input type="text" class="phone" value="'+data.phone+'"></td>\
	                                <td><button class="updatebtn">Update</button>\
	                                <td><button class="deletebtn">Delete</button>\
	                                <td><button class="refreshbtn">Refresh</button>\
	                                </td>\
	                                </tr>\
	                            	');
			
							}

         				});

        });


        // edit

        $('#table2').on('click','.editbtn',function(e) {
		e.preventDefault();
          var currentlin = $(this).closest("tr");
		  var id = currentlin.find('.id').text();
		  var name = currentlin.find('.name').text();
		  var gender = currentlin.find('.gender').text();
		  var company = currentlin.find('.company').text();
		  var email = currentlin.find('.email').text();
		  var phone = currentlin.find('.phone').text();
          console.log(id);
		 $.ajax({
		type:'PUT',
		url:'http://localhost:3000/people/'+id,
		
		success:function(){
			                   
			                 tbody1.html('\
	        						<tr><td><input type="text" class="id" value="'+id+'"></td>\
	                                <td><input type="text" class="name" value="'+name+'"></td>\
	                                <td><input type="text" class="gender" value="'+gender+'"></td>\
	                                <td><input type="text" class="company" value="'+company+'"></td>\
	                                <td><input type="text" class="email" value="'+email+'"></td>\
	                                <td><input type="text" class="phone" value="'+phone+'"></td>\
	                                <td><button class="updatebtn">Update</button>\
	                                <td><button class="deletebtn">Delete</button>\
	                                <td><button class="refreshbtn">Refresh</button>\
	                                </td>\
	                                </tr>\
	                            	');

			
		}

         });

        });

        $('#table2').on('click','.refreshbtn',function() {
		
         location.reload();
         /*setTimeout(
			  function() 
			  {
			    $('#show').click();
			  }, 5000);*/

	    });

});

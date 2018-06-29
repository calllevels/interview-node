$(document).ready(function(){
	$(document).on('click','.warn',function(){
		var d = $(this).parents('tr.r').find(':input').serialize();
		tres(d)
	})
	$(document).on('click','.rate',function(){
		var d = $(this).parents('tr.r').find(':input').serialize();
		rate(d)
	})
	$(document).on('click','.init',function(){
		pop()
	})
	$(document).on('click','.x',function(){
		unset(this)
	})
function tres(d){
	$.ajax({
		url:'update',
		datatype:'json',
		method:'POST',
		data:d+'&tres=1',
		success:function(data){
			get()
			alert('repupulated!');
		}
	})
}
function rate(d){
	$.ajax({
		url:'update',
		datatype:'json',
		method:'POST',
		data:d+'&rate=1',
		success:function(data){
			get()
			alert('repupulated!');
		}
	})
}
function build(data){
	$('#cont').html('');
	var s = [],al=[];
	walker = $.parseJSON(data);
	if(!$.trim(walker)){virgin();return;}
	$.each(walker,function(k,v){
		
		var tres =(typeof v.treshold !== 'undefined')?v.treshold:'';
		s.push('<tr class=r rel=><td>'+k+'</td><td><input name="cur['+k+']" value="'+v.rate+'"><button class=rate>Set</button></td><td><input name="tres['+k+']" value="'+tres+'"><button class=warn>Set</button></td><td><button class=x>x</button></td></tr>');
		if(parseFloat(tres) < parseFloat(v.rate) ){ al.push(k)}
		
	})
	
	if(al.length){  alert('rate of '+al.join(',')+ ' too high') }
	
	$('#cont').html('<table class=t><thead><tr class=rh><td>Currency</td><td>Rate</td><td>Treshold</td><td>Option</td></tr></thead><tbody>'+s.join('')+'<tr><td colspan=100%><button class="init">reset</button></td></tr></tbody></table>');
}
function pop(){
	$.ajax({
		url:'fetch',
		datatype:'json',
		method:'POST',
		data:'a=a',
		success:function(data){
			build(data)
		}
	})
}

function virgin(){
	if(!$('#cont').text()){
		
		$('#cont').append('<button class=init>Init</button>')
	}
}

function get(){
	$.ajax({
		url:'data',
		datatype:'json',
		method:'get',
		data:'a=a',
		success:function(data){
			build(data)
		}
	})
}
function unset(o){
	var d = $(o).parents('tr.r').find(':input').serialize();
	$.ajax({
		url:'unset',
		datatype:'json',
		method:'post',
		data:d,
		success:function(data){
			get()
		}
	})
}



get();
})
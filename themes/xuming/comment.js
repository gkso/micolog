﻿jQuery(document).ready(
	function(){
		var id=/^#comment-/;
		var at=/^@/;
		jQuery('#commentlist li p a').each(
			function() {
				if(jQuery(this).attr('href').match(id)&& jQuery(this).text().match(at)) {
					jQuery(this).addClass('atreply');
				}
			}
		);
		jQuery('.atreply').hover(
			function() {
				jQuery(jQuery(this).attr('href')).clone().hide().insertAfter(jQuery(this).parents('li')).attr('id','').addClass('tip').fadeIn(200);
			},
			function() {
				jQuery('.tip').fadeOut(400, function(){jQuery(this).remove();});
			}
		);
		jQuery('.atreply').mousemove(
			function(e) {
				jQuery('.tip').css({left:(e.clientX+18),top:(e.pageY+18)})
			}
		);


loadjs=false;





$('#commentform').ajaxForm({
              	type:'post',
              	dataType:  'json',
              	beforeSubmit:function(formData,jqForm,options){
              		   var form = jqForm[0];



                  		 if (!form.comment.value)
                  		 {
                  		 	showinfo('请输入留言内容');
                  		 	form.comment.focus();
                  		 	return false;
                  		 }

                  		 $('#s_msg').text('正在提交留言...').show();
                        $("#submit").attr('disabled',true);

	              		 return true;

              		},
              	success:function(data){
                    $("#submit").attr('disabled',false);
              		  if (data[0])
              		  {
              		  	/*document.cookie=data[2];*/
                        	alert('留言提交成功！');
              		  	add_comment(data[1]);

            		  	$('#s_msg').text('留言提交成功！');
              		  	$('#comment').val('');
                        if($('#checkarea').css('display')=='block')
						{
							if($("#check_type").val()>0)
                        	{ get_check_area($("#check_type").val());}
						}
						$('#checkret').val('');
                        location="#comments";
              		  }
              		  else
              		  {  if (data[1]==-102)
              		  	 showinfo('验证码错误。');
              		  	 $('#s_msg').text('留言提交失败！');
              		  	 $('#checkret').focus();

              		  }
              		}
              });
	}
)


function rnd()
{
    var today=new Date();
    var seed=today.getTime();
    seed = (seed*9301+49197) % 233281;
    return seed/(233281.0);
}

function rand(number)
{
　　return Math.ceil(rnd()*number);
}


function get_check_area(type)
{
	if (type==1)
	{
        $('#check').load('/checkcode/');
		$('#checkarea').show();
	}else if(type==2)
	{
	    $('#check').html('<img id="checkimg" src="/checkimg/" style="border:0px;padding:0;float:left;margin-right:8px"/>');
        $('#checkarea').show();
	}else if(type==3)
	{
		 checknum1=rand(10);
		 checknum2=rand(10);
        $('#check').html('<span style="color:red">'+ checknum1+'+'+checknum2+'=</span>'
        		+'<input type="hidden" name="checknum" id="checknum" value="'+(checknum1+checknum2)+'" />');
		$('#checkarea').show();

	}


}

function showinfo(msg)
{
  alert(msg);
}
function add_comment(msg)
{

  comment=$(msg)
  if (!loadjs)
  {
  	$("#commentlist").prepend(comment).show();
  	$.getScript("http://dev.jquery.com/view/trunk/plugins/color/jquery.color.js", function(){
  		 comment.animate( { backgroundColor: '#fbc7c7' }, "slow")
					.animate( { backgroundColor: 'white' }, "slow")
					loadjs=true;
				});
  }else
  {
  	$("#commentlist").prepend(comment);
  	  comment.animate( { backgroundColor: '#fbc7c7' }, "slow")
					.animate( { backgroundColor: 'white' }, "slow")

  }
}

function backcomment(author,id){
    backdb=document.getElementById('comment');
    backdb.focus();
    backdb.value=backdb.value+'<a href=\"#comment-'+id+'\">@'+author+'<\/a>'+'\n';
    return false;
}


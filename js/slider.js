$(document).ready(function(){
	var slider = {
		curIndex: 1,
		num: -1,
		slideTimer: null,

		init: function(){
			$(".view-item:first-child").clone().appendTo($(".view"));
			slider.num = $(".view-item").length;
			$(".view").css("width", slider.num*100 + "%");
			$(".view-item").css("width", 100/slider.num + "%");
			slider.play();
			var viewNavItems = $(".view-nav-item");
			/*for(var i = 1; i <= viewNavItems.length; i++){
				(function(i){
					$(".view-nav-item:nth-child("+i+")").on("click",function(e){
						e.stopPropagation();
						clearInterval(playInterval);
						slider.slide(i);
						slider.play();
					})
				})(i);
			}*/
			for(var i = 0; i < viewNavItems.length; i++){
				(function(i){
					viewNavItems[i].addEventListener("click", function(e){
						e.stopPropagation();
						clearInterval(slideTimer);
						slider.slide(i+1);
						slider.play();
					})
				})(i);
			}
		},

		slide: function(targetIndex){
			$(".view").stop(true).animate({left:-(targetIndex-1)*100+"%"}, 300, function(){
				if(targetIndex == slider.num){
						slider.curIndex = 1;
						$(".view").css("left", 0);
				}else{
					slider.curIndex = targetIndex;
				}
				$(".view-nav .active").removeClass("active");
				$(".view-nav-item:nth-child("+slider.curIndex+")").addClass("active");
			});
			
		},

		play: function(){
			slideTimer = setInterval(function(){
				var targetIndex = slider.curIndex + 1;
				slider.slide(targetIndex);
			},2000);
		}
	};
	
	slider.init();
});



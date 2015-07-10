$(document).ready(function(){
	var touchSlider = {
		curIndex: 1,
		num: -1,
		realNum: -1,
		sliderTime: null,
		slideDom: null,
	  touchInfo: {},

	  init: function(){
	  	touchSlider.realNum = $(".view-item").length;
	  	var firstItem = $(".view-item:first-child"),
	  			lastItem = $(".view-item:last-child");
	  	firstItem.clone().appendTo($(".view"));
	  	lastItem.clone().prependTo($(".view"));
	  	touchSlider.slideDom = $(".view")[0];
	  	touchSlider.slideDom.addEventListener("touchstart",touchSlider);
			touchSlider.num = $(".view-item").length;
			$(".view").css("width", touchSlider.num*100 + "%");
			$(".view-item").css("width", 100/touchSlider.num + "%");
			$(".view").css("transform","translateX(-"+window.innerWidth+"px)");
			touchSlider.play();
			var viewNavItems = $(".view-nav-item");
			for(var i = 0; i < viewNavItems.length; i++){
				(function(i){
					viewNavItems[i].addEventListener("click",function(e){
						e.stopPropagation();
						clearInterval(slideTimer);
						touchSlider.slide(i+1);
						touchSlider.play();
					})
				})(i);
			}
		},

		slide: function(targetIndex){
			var dist = -targetIndex * window.innerWidth;
			$(".view").one("transitionend", function(){
				if(targetIndex == touchSlider.num-1){
					touchSlider.curIndex = 1;
					$(".view").css("transform","translateX(-"+window.innerWidth+"px)").css("transition","transform 0ms");
				}else if(targetIndex == 0){
					touchSlider.curIndex = touchSlider.realNum;
					$(".view").css("transform","translateX(-"+touchSlider.curIndex*window.innerWidth+"px)").css("transition","transform 0ms");
				}else{
					touchSlider.curIndex = targetIndex;
				}
				$(".view-nav .active").removeClass("active");
				$(".view-nav-item:nth-child("+touchSlider.curIndex+")").addClass("active");
			})
			$(".view").css("transform","translateX("+dist+"px)").css("transition","transform 300ms");
			
		},

		play: function(){
			slideTimer = setInterval(function(){
				var targetIndex = touchSlider.curIndex + 1;
				touchSlider.slide(targetIndex);
			},2000);
		},

		onTouchStart: function(e){
			var gallery = touchSlider.slideDom;
			gallery.removeEventListener("touchmove", touchSlider);
			gallery.removeEventListener("touchend", touchSlider);
			gallery.addEventListener("touchmove", touchSlider);
			gallery.addEventListener("touchend", touchSlider);
			touchSlider.touchInfo.startX = e.touches[0].pageX;
			touchSlider.touchInfo.curTrans = Number($(".view").css("transform").match(/\-?\d+/g)[4]);
			clearInterval(slideTimer);
		},

		onTouchMove: function(e){
			var stopX = e.touches[0].pageX;
			    dist = stopX - touchSlider.touchInfo.startX,
	        newTrans = touchSlider.touchInfo.curTrans + dist;
	    touchSlider.touchInfo.stopX = stopX;
			$(".view").css("transform","translateX("+newTrans+"px)").css("transition","transform 0ms");
		},

		onTouchEnd: function(){
			var dist = touchSlider.touchInfo.stopX - touchSlider.touchInfo.startX;
					targetIndex = touchSlider.curIndex;
			console.log(dist);
			if(dist < -100){
					targetIndex++;
			}
			if(dist > 100){
					targetIndex--;
			}
			touchSlider.slide(targetIndex);
			touchSlider.play();
		},

		handleEvent: function(e){
			switch(e.type){
				case "touchstart":
					touchSlider.onTouchStart(e);
					break;
				case "touchmove":
					touchSlider.onTouchMove(e);
					break;
				case "touchend":
					touchSlider.onTouchEnd(e);
					break;
			}
		}
	};
	
	touchSlider.init();
});
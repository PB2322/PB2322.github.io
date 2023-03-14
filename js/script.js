var rope1 = document.getElementById("rope1"),
    inc = 100, //number of path points
    start1 = 100, //starting number 1
    start2 = 1000; //starting number 2

//plotting the points
function plotter(points, startX) {
  var pathArr = [],
    pathpoints = [];
  for (i = 0; i <= inc; i++) {
    pathpoints.push(points + ((i * (points * 2)) + points));
    pathArr.push(" " + startX + " " + pathpoints[i]);
  }
  return pathArr;
}

rope1.setAttribute("d", "M " + plotter(50, start1).join(" L"));

//making the wobble
function newWobble(rate, startX) {
  var in1 = startX + rate,
    in2 = startX - rate,
    pathArr2 = plotter(rate, startX);

  for (i = 0; i <= inc; i++) {
    var QRate = rate + (i + 1) * (rate * 2);
    if (i % 2 === 0) {
      pathArr2[i] = pathArr2[i] + " Q " + Math.round(in1) + " " + QRate;
    } else {
      pathArr2[i] = pathArr2[i] + " Q " + Math.round(in2) + " " + QRate;
    }
  }
  return "M" + pathArr2.join("") + " " + startX + " " + (inc * (rate * 2) + rate);
}

TweenMax.set(".yarn", {
  visibility: "visible"
});

TweenMax.set(".rope-yarn", {
  rotation: 90,
  y: -70,
  x: 100
});

function sceneOne() {
  var tl = new TimelineMax();

  tl.to("#rope1", 1.25, {
    attr: {
      d: newWobble(10, start1)
    },
    ease: Power2.easeOut
  });
  tl.to("#rope1", 0.85, {
    attr: {
      d: newWobble(50, start1)
    },
    ease: Power4.easeIn
  });
  tl.add("begin");
  tl.to("#rope1", 0.5, {
    attr: {
      d: newWobble(10, start1)
    },
    ease: Bounce.easeOut
  }, "begin");
  tl.from("#round", 2, {
    rotation: -500,
    transformOrigin: "50% 50%",
    x: -2000,
    ease: Power2.easeOut
  }, "begin+=0.5");
  tl.fromTo("#round", 3, {
    y: -350
  }, {
    y: 0,
    ease: Bounce.easeOut
  }, "begin");
  tl.to("#rope1", 1, {
    attr: {
      d: newWobble(15, start1)
    },
    ease: Bounce.easeOut
  }, "begin+=0.5");
  tl.fromTo("#yarn-path", 2.2, {
    drawSVG: '0 0'
  }, {
    drawSVG: true,
    ease: Power4.easeOut
  }, "begin+=1.4");
  tl.to("#thread", 1.5, {
    opacity: 0,
    ease: Sine.easeOut
  }, "begin+=1.5");
  tl.to(".cat", 1.5, {
    opacity: 1,
    ease: Sine.easeOut
  }, "begin+=1.5");
  tl.to("#back-circ", 1.5, {
    fill: "#2e8eba",
    ease: Sine.easeOut
  }, "begin+=1.5");
  tl.to("#rope1", 1, {
    drawSVG: '0 0',
    ease: Sine.easeOut
  }, "begin+=0.4");
  
  return tl;
}
  
function sceneTwo() {
  var tl = new TimelineMax(),
      int = 0.75;
  
  tl.add("colors");
  tl.to("#turbwave", 1.5, {
    attr:{"baseFrequency":0.01},
    ease:Sine.easeOut
  });
  tl.to("#turbwave", 2, {
    attr:{"baseFrequency":0.015},
    ease:Sine.easeInOut
  });
  tl.to("#turbwave", 1.5, {
    attr:{"baseFrequency":0},
    ease:Sine.easeIn
  });
  
  tl.to("#back-circ", int, {
    fill: "#c4be46",
    ease:Sine.easeOut
  }, "colors");
   tl.to("#yarn-path", int, {
    stroke: "#c4be46",
    ease:Sine.easeOut
  }, "colors");
  tl.to("#back-circ", int, {
    fill: "#e04557",
    ease:Sine.easeInOut
  }, "colors+=0.75");
   tl.to("#yarn-path", int, {
    stroke: "#e04557",
    ease:Sine.easeInOut
  }, "colors+=0.75");
  tl.to("#back-circ", int, {
    fill: "#a12fce",
    ease:Sine.easeInOut
  }, "colors+=1.5");
   tl.to("#yarn-path", int, {
    stroke: "#a12fce",
    ease:Sine.easeInOut
  }, "colors+=1.5");
  tl.to("#back-circ", 1, {
    fill: "#7360e0",
    ease:Sine.easeInOut
  }, "colors+=2.25");
   tl.to("#yarn-path", 1, {
    stroke: "#7360e0",
    ease:Sine.easeInOut
  }, "colors+=2.25");
   tl.to("#back-circ", 1, {
    fill: "#2e8eba",
    ease:Sine.easeIn
  }, "colors+=3.25");
   tl.to("#yarn-path", 1, {
    stroke: "#2e8eba",
    ease:Sine.easeIn
  }, "colors+=3.25");
  
  tl.timeScale(1.1);

  return tl;
}

var master = new TimelineMax();
master.add(sceneOne(), "scene1");
master.add(sceneTwo(), "scene2");

//ScrubGSAPTimeline(master);
  
function addFilter() {
  var all = document.getElementById("all");
  all.setAttribute("filter", "url(#turb)");
};

(function addFilterTimed() {
  window.setTimeout(addFilter, 5000);
}());

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//Animation for Title Text
// Credit for animation: Tobias Ahlin Moving letters - https://tobiasahlin.com/moving-letters/*/
anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.5em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

//Globe animation on home page 
// Credit for the original version of this is Stranger in the Q on Codepen: https://codepen.io/strangerintheq/pen/zXVpQw
var w, h, scl, is3d = true; 
var svg = d3.select("#svgDiv").append("svg")
var projection = d3.geoOrthographic();

var path = d3.geoPath().projection(projection);
var map = svg.append("g");

var drag = d3.drag()
	.on("start", dragstarted)
	.on("drag", dragged);

var gpos0, o0, gpos1, o1;
svg.call(drag);

var zoom = d3.zoom()

	.on("zoom", zoomed);

svg.call(zoom);

d3.json("https://gist.githubusercontent.com/sarah37/dcca42b936545d9ee9f0bc8052e03dbd/raw/550cfee8177df10e515d82f7eb80bce4f72c52de/world-110m.json").then(function(json) {
	map.append("path")
	.datum({type: "Sphere"})
	.attr("class", "ocean")
	.attr("d", path);

	map.append("path")
	.datum(topojson.merge(json, json.objects.countries.geometries))
	.attr("class", "land")
	.attr("d", path);

	map.append("path")
	.datum(topojson.mesh(json, json.objects.countries, function(a, b) { return a !== b; }))
	.attr("class", "boundary")
	.attr("d", path);
});

let resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    scl = Math.min(w, h)/2;
    projection.translate([ w/2, h/2 ]);
    svg.attr("width", w).attr("height", h);
    map.selectAll("path").attr("d", path);
}

resize();

d3.select(window).on('resize', resize)

function switchProjection() {
    let s = projection.scale();
    let r = projection.rotate();
    let c = projection.center()
    if (is3d = !is3d) {
        projection = d3.geoOrthographic()
        projection.rotate([-c[0],-c[1]]);
    } else {
        projection = d3.geoMercator();
        projection.center([-r[0],-r[1]]);
    }
    projection.scale(s);
    map.selectAll("path").attr("d", path.projection(projection));
    resize();
}

function dragstarted() {
	gpos0 = projection.invert(d3.mouse(this));
    c0 = projection.center();
}

function dragged() {
    gpos1 = projection.invert(d3.mouse(this));
    if (is3d) {
        o0 = projection.rotate();
        o1 = eulerAngles(gpos0, gpos1, o0);
        o1 && projection.rotate(o1);
    } else {
        
    }
    
	map.selectAll("path").attr("d", path);
}

function zoomed() {
	projection.scale(d3.event.transform.translate(projection).k * scl)
	map.selectAll("path").attr("d", path);
}

// all functions are from http://bl.ocks.org/ivyywang/7c94cb5a3accd9913263

var to_radians = Math.PI / 180;
var to_degrees = 180 / Math.PI;


function cross(v0, v1) {
    return [v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]];
}

function dot(v0, v1) {
    for (var i = 0, sum = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
    return sum;
}

// Helper function: 
// This function converts a [lon, lat] coordinates into a [x,y,z] coordinate 
// the [x, y, z] is Cartesian, with origin at lon/lat (0,0) center of the earth
function lonlat2xyz( coord ){

	var lon = coord[0] * to_radians;
	var lat = coord[1] * to_radians;

	var x = Math.cos(lat) * Math.cos(lon);

	var y = Math.cos(lat) * Math.sin(lon);

	var z = Math.sin(lat);

	return [x, y, z];
}

// Helper function: 
// This function computes a quaternion representation for the rotation between to vectors
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quaternion(v0, v1) {

	if (v0 && v1) {
		
	    var w = cross(v0, v1),  // vector pendicular to v0 & v1
	        w_len = Math.sqrt(dot(w, w)); // length of w     

        if (w_len == 0)
        	return;

        var theta = .5 * Math.acos(Math.max(-1, Math.min(1, dot(v0, v1)))),

	        qi  = w[2] * Math.sin(theta) / w_len; 
	        qj  = - w[1] * Math.sin(theta) / w_len; 
	        qk  = w[0]* Math.sin(theta) / w_len;
	        qr  = Math.cos(theta);

	    return theta && [qr, qi, qj, qk];
	}
}

// Helper function: 
// This functions converts euler angles to quaternion
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function euler2quat(e) {

	if(!e) return;
    
    var roll = .5 * e[0] * to_radians,
        pitch = .5 * e[1] * to_radians,
        yaw = .5 * e[2] * to_radians,

        sr = Math.sin(roll),
        cr = Math.cos(roll),
        sp = Math.sin(pitch),
        cp = Math.cos(pitch),
        sy = Math.sin(yaw),
        cy = Math.cos(yaw),

        qi = sr*cp*cy - cr*sp*sy,
        qj = cr*sp*cy + sr*cp*sy,
        qk = cr*cp*sy - sr*sp*cy,
        qr = cr*cp*cy + sr*sp*sy;

    return [qr, qi, qj, qk];
}

// This functions computes a quaternion multiply
// Geometrically, it means combining two quant rotations
// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/arithmetic/index.htm
function quatMultiply(q1, q2) {
	if(!q1 || !q2) return;

    var a = q1[0],
        b = q1[1],
        c = q1[2],
        d = q1[3],
        e = q2[0],
        f = q2[1],
        g = q2[2],
        h = q2[3];

    return [
     a*e - b*f - c*g - d*h,
     b*e + a*f + c*h - d*g,
     a*g - b*h + c*e + d*f,
     a*h + b*g - c*f + d*e];

}

// This function computes quaternion to euler angles
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quat2euler(t){

	if(!t) return;

	return [ Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * to_degrees, 
			 Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * to_degrees, 
			 Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * to_degrees
			]
}

/*  This function computes the euler angles when given two vectors, and a rotation

	v0 - starting pos in lon/lat, commonly obtained by projection.invert
	v1 - ending pos in lon/lat, commonly obtained by projection.invert
	o0 - the projection rotation in euler angles at starting pos (v0), commonly obtained by projection.rotate
*/

function eulerAngles(v0, v1, o0) {

	var t = quatMultiply( euler2quat(o0), quaternion(lonlat2xyz(v0), lonlat2xyz(v1) ) );
	return quat2euler(t);	
}
 

//Showing the rules on click on the button on homepage
const rulesList = document.getElementById('rules');
    rulesList.addEventListener('click', function(){
   document.getElementById("show-rules").innerHTML = `<p id="clicked-rules">There will be 10 questions to answer. <br>There is a timer to see how fast you can complete the quiz. <br>The color will show if you have answered correct or not. 
    <br> You will be told your final score at the end of the game.</p>`;
});


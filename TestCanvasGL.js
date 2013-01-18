/**
 * Created with JetBrains WebStorm.
 * User: DEEV
 * Date: 27.12.12
 * Time: 09:49
 * To change this template use File | Settings | File Templates.
 */

function TestCanvasGL(parentDomElementId)
{
    //CanvasGLOptions.doLog = false;
    this.cgl = new CanvasGL(parentDomElementId);
    this.cgl.setSize(window.innerWidth*0.5,window.innerHeight);
    this.t = 0.0;

    this.numImages = 3;
    this.numImagesLoaded = 0;

    this.img0 = new CanvasGLImage();
    this.img1 = new CanvasGLImage();
    this.img2 = new CanvasGLImage();
    var c = this.cgl;

    this.img0Data = null;

    this.sn = new SimplexNoise();

    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    c.loadImage("l512.jpg",this.img0,this,"onImageLoaded");
    c.loadImage("m512.jpg",this.img1,this,"onImageLoaded");
    c.loadImage("c512.jpg",this.img2,this,"onImageLoaded");


}


TestCanvasGL.prototype.onWindowResize = function()
{
    var w = window.innerWidth < 1280 ? 1280 : window.innerWidth;
    this.cgl.setSize(w*0.5,window.innerHeight);
};

TestCanvasGL.prototype.onImageLoaded = function()
{
    this.numImagesLoaded++;
    if(this.numImagesLoaded == this.numImages)this.onImagesLoadedComplete();
};

TestCanvasGL.prototype.onImagesLoadedComplete = function()
{
    this.img0Data = this.cgl.getImagePixel(this.img0);

    this.animationLoop();
};

TestCanvasGL.prototype.animationLoop = function()
{
    requestAnimationFrame(TestCanvasGL.prototype.animationLoop.bind(this));
    this.draw();

};

function TestCanvasGLDemo(){}

TestCanvasGL.prototype.draw = function()
{

    this.t+=0.05;
    var t = this.t,
        c = this.cgl;

    c.background(10);
    c.noStroke();
    c.noStroke();
   c.fill(255);



    //12
    var i,j;
    var rs = c.width/16,rs2 = rs* 2,rs3 = rs* 3,rs4 = rs* 4,rs05 =rs*0.5, rs025 = rs* 0.25;
    var pa,ps;
    var pp0,pp1,pp2,pp3,pp4,pp5,pp6,pp7;
    var sint = sin(t),sint05 = sin(t*0.5),sint025 = sin(t*0.25);
    var asint = abs(sint), asint05 = abs(sint05),asint025 = abs(sint025);

    var verticesA,verticesB;
    var indicesA,indicesB;

    var transformedPoint = [];

    var img0 = this.img0, img1 = this.img1, img2 = this.img2;

    function t01(x,y)
    {
        c.pushMatrix();
        {
            pp0 = 255*abs(sint025);
            c.translate(x,y);
            c.image(img0,0,0,rs2,rs2);

            c.setEllipseDetail(40);
        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(x,y+rs);
            c.stroke(100,0,0);

            pa = 100;
            ps = (rs2)/(pa-1);

            verticesA = [];

            pp1 = 1+2*abs(sin(t*0.05));
            c.noStroke();
            i = -1;
            while(++i < pa)
            {
                pp0 = i/(pa)*PI-t*0.25;
                verticesA.push(i*ps,rs*0.5 +rs05*sin(pp0*pp1),i*ps,rs);
            }
            i = 0;
            c.fill(10);
            c.triangleMesh(verticesA);

        }
        c.popMatrix();
    }

    function t02(x,y)
    {
        c.pushMatrix();
        {
            pp0 =rs05;

            c.translate(x+rs+pp0,y+pp0);
            c.fill(stepCubed(asint025)*150,0,0);
            c.rotate(HALF_PI*stepCubed(asint025));
            pp0 =rs025+rs*0.25*stepCubed(asint025);

            c.triangleMesh([-pp0,-pp0,pp0,-pp0,pp0,pp0,-pp0,pp0],[0,1,3,1,2,3]);
            transformedPoint = c.getScreenCoord(pp0,0);

        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(x,y);
            c.fill(150,0,0);
            c.triangle(0,0,rs,0,rs,rs);
            c.triangle(rs,rs,rs2,rs,rs2,rs2);

            c.translate(rs*0.5,rs+rs05);
            c.rotate(t*0.5);
            c.fill(100+floor(155*asint));
            c.setEllipseDetail(3+floor(27*asint025));
            c.ellipse(0,0,rs*0.25 +rs025*asint,rs*0.5-rs*0.25*asint);

        }
        c.popMatrix();
    }



    c.pushMatrix();
    {
        c.translate(0,0);
        c.scale(1,1);

        t01(0,0);
        t02(rs2,0);
        t01(0,rs*8);


        c.pushMatrix();
        {
            c.translate(rs*4+6,6);

            pp0 = abs(sin(t*0.05));
            pp3 = abs(sin(t*0.075));
            pp4 = abs(sin(t*0.0075));



            var anchor0 = [(rs2-6)-(rs2-6)*pp4,pp3*(rs2-12)],
                anchor1 = [(rs2-6)*pp4,(rs2-12)-pp3*(rs2-12)];

            var cntrl0 = [(rs2-6)-(rs2-6)*pp0,0],
                cntrl1 = [(rs2-6)*pp0,rs2-12];

            c.stroke(80);
            c.line(anchor0[0],anchor0[1],cntrl0[0],cntrl0[1]);
            c.line(anchor1[0],anchor1[1],cntrl1[0],cntrl1[1]);

            c.noStroke();
            c.fill(80);
            c.setEllipseDetail(10);
            c.circle(cntrl1[0],cntrl1[1],3);
            c.circle(cntrl0[0],cntrl0[1],3);

            c.stroke(255);

            c.bezier(anchor0[0],anchor0[1],cntrl0[0],cntrl0[1],
                cntrl1[0],cntrl1[1],anchor1[0],anchor1[1]);



            c.fill(255);
            pp0 = c.bezierPoint(0);
            c.circle(pp0[0],pp0[1],3);
            pp0 = c.bezierPoint(1);
            c.circle(pp0[0],pp0[1],3);

            pp1 = floor(10*abs(sin(t*0.025)));

            i = 0;
            while(++i < pp1)
            {
                pp0 = c.bezierPoint(i/pp1);
                c.fill(255);
                c.circle(pp0[0],pp0[1],3);
                c.fill(150,0,0);
                c.circle(pp0[0],pp0[1],2);

            }

        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(rs*6,0);

            c.noStroke();
            c.fill(6,149,155);

            pp0 = new Array(10);
            pp1 = PI / pp0.length * 0.25;
            i=0;
            while(i < pp0.length)
            {
                pp2 = i*pp1;
                pp0[i]   =randomFloat(rs2);
                pp0[i+1] = randomFloat(rs2);
                i+=2;
            }



            i = 2;
            while(i < pp0.length)
            {
                c.circle(pp0[i],pp0[i+1],3,3);
                i+=2;
            }

            c.stroke(6,149,155);
            c.lines(pp0);

            c.setSplineDetail(20);
            c.stroke(255);
            c.catmullRomSpline(pp0);




        }

        c.popMatrix();
        c.pushMatrix();
        {
            c.setBlendFunc(CanvasGL.SRC_COLOR,CanvasGL.ONE_MINUS_SRC_COLOR);
            c.blend();
            pp0 = 0+rs*0.75*stepSmooth(asint05);
            pp1 = rs*stepSmoothCubed(abs(sint025));
            c.translate(rs2*4+rs,rs);
            c.rotate(TWO_PI*4*stepSmoothCubed(abs(sint025)));
            c.noStroke();
            c.fill(255,0,0,0.5);
            c.setEllipseDetail(30);
            c.circle(-pp1*0.25,pp1*0.25,pp0);
            c.fill(0,0,255,0.5);
            c.circle(+pp1*0.25,pp1*0.25,pp0);
            c.fill(0,255,0,0.5);
            c.circle(0,-pp1*0.25,pp0);
            c.setBlendFunc(CanvasGL.SRC_ALPHA,CanvasGL.ONE_MINUS_SRC_ALPHA);
            c.blend();

        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.setBlendFunc(CanvasGL.SRC_COLOR,CanvasGL.ONE_MINUS_SRC_COLOR);
            c.blend();
            c.translate(rs2*5,0);

            c.fill(255,0,255);
            c.pushMatrix();
            c.translate(rs,rs);
            c.rect(-rs+20,-rs+20,rs2-40,rs2-40);
            c.popMatrix();

            c.image(this.img1,0,0,rs2,rs2);
            c.setBlendFunc(CanvasGL.SRC_ALPHA,CanvasGL.ONE_MINUS_SRC_ALPHA);
            c.blend();
        }
        c.popMatrix();

        c.pushMatrix();
        {
            c.translate(0,rs2+rs*0.5);

            c.stroke(30);
            c.noFill();
            c.rect(0,rs2,rs2,rs2);

            c.stroke(100,0,0);

            pa =100;
            ps = (rs2)/(pa-1);

            verticesA = [];
            verticesB = [];

            pp0 = 10* abs(sin(t*0.05));
            pp1 = 20;

            i = -1;
            while(++i < pa)
            {
                verticesA.push(i*ps,rs*0.5 + pp1*sin(pp0*i/(pa)*PI+t));
                verticesB.push(i*ps,rs*0.5 + pp1*sin((PI+pp0*i/(pa)*PI)+t));

                c.stroke(20);
                c.line(verticesA[verticesA.length-2],verticesA[verticesA.length-1],
                    verticesB[verticesB.length-2],verticesB[verticesB.length-1]);


            }


            c.stroke(100,0,0);
            c.lines(verticesA);
            c.lines(verticesB);

            c.fill(255);

            c.noStroke();
            c.setEllipseDetail(6);
            i = 0;
            while(i < verticesA.length)
            {

                pp0 = 5*abs(sin(t*0.05));
                c.fill(0,0.5);
                c.circle(verticesA[i]-1,verticesA[i+1]+1,pp0+0.5);
                c.circle(verticesB[i]-1,verticesB[i+1]+1,pp0+0.5);
                c.fill(map(verticesA[i],0,rs2,0,255));
                c.circle(verticesA[i],verticesA[i+1],pp0);
                c.circle(verticesB[i],verticesB[i+1],pp0);
                /*
                c.fill(255);
                c.circle(verticesA[i],verticesA[i+1],3);
                c.circle(verticesB[i],verticesB[i+1],3);
                c.fill(0);
                c.circle(verticesA[i],verticesA[i+1],2.2);
                c.circle(verticesB[i],verticesB[i+1],2.2);
                */

                i+=2;
            }


            c.noStroke();
        }
        c.popMatrix();

        c.pushMatrix();
        {
            var textdiv = document.getElementById("ontoptext");



            c.translate(rs2+rs,rs2*3+rs);
            c.setEllipseDetail(20);
            c.stroke(40);
            c.noFill();
            c.ellipse(0,0,rs*0.5,rs*0.75);
            c.noStroke();
            c.fill(100,0,0);
            c.arc(0,0,rs*0.5+3,rs*0.75+3,-t*0.25,-t*0.25-HALF_PI-QUARTER_PI,rs*0.5-3,rs*0.75-3);
            c.translate(rs*0.5*sin(t*0.25),+rs*0.75*cos(t*0.25));
            c.fill(255);
            c.rotate(QUARTER_PI);
            c.rect(-2.5,-2.5,5,5);


            pp0 = c.getScreenCoord();



            textdiv.style.left  = pp0[0]+"px";
            textdiv.style.top  = pp0[1]+"px";
            textdiv.innerHTML = Math.floor(((sin(t*0.25)))*100)/100;
            c.setEllipseDetail(4);


        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(rs4,rs2);

            pa = this.img0Data.length;

            pp0 = this.img0.width;
            pp1 = this.img0.height;
            pp3 = this.img0Data;

            c.setBlendFunc(CanvasGL.SRC_COLOR,CanvasGL.ONE_MINUS_SRC_COLOR);
            c.blend();







            var s = 40;

            var is = Math.floor(pp0/(s));

            var nn  = stepSmoothCubed(asint05);
            pp5 = [];
            pp6 = [];


            c.translate(rs,rs);


            pp7 = stepSmoothCubed(abs(sin(t*0.125)));
            c.noStroke();

            i = 0;

            while(i < pp0)
            {
                j = 0;
                while(j < pp1)
                {
                    nn  = stepSmoothCubed(abs(sin(t*0.5+(pa-(i*j)/(pa*2))*2)));
                    pp2 = (i+j*pp0)*4;

                    pp4 = [pp3[pp2],pp3[pp2+1],pp3[pp2+2],pp3[pp2+3]];

                    pp5 = [i/(pp0)*rs2,j/(pp1)*rs2];
                    pp6 = [rs  ,rs];

                    c.fill(Math.floor(pp4[0]*(1-pp7)+(255-pp4[0])*pp7),
                           0,0,1);

                    c.rect(pp5[0] * (1-nn) + pp6[0] * nn - rs,pp5[1] * (1-nn) + pp6[1] * nn -rs,is*(nn),is*(nn));


                    j+=s;

                }

                i+=s;
            }

            c.setBlendFunc(CanvasGL.SRC_ALPHA,CanvasGL.ONE_MINUS_SRC_ALPHA);
            c.blend();

        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(rs2*4,rs2);
            c.fill(100,0,0);
            i = -1;
            pa  = 10+ floor(20*stepSmooth(asint05));
            pp0 = rs2/ (pa);
            c.setEllipseDetail(10);
            while(++i < pa)
            {
                j = -1;
                while(++j < pa)
                {
                    pp1 = this.sn.noise(i+ t*0.125,j-t*0.125);
                    c.fill((i/pa)*255,0,j/pa*255);
                    c.circle(i*pp0+pp0*0.5,j*pp0+pp0*0.5,pp0*0.5*pp1);
                }
            }
        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(0,rs*4);
            pp0 = asint;
            pp1 = asint05;
            c.setEllipseDetail(40);
            c.fill(255);
            c.circle(rs,rs,rs-11,rs-11,100);
            c.fill(0);
            c.arc(rs,rs,rs*0.5+rs*0.25*pp1+10,rs*0.5+rs*0.25*pp1+10,0,(PI-PI*0.25)*pp1,30*pp1,30*pp1);
            c.fill(100,0,0);
            c.arc(rs,rs,rs*0.5+rs*0.25*pp1+10,rs*0.5+rs*0.25*pp1+10,0,pp1*-PI*0.25,30*pp1,30*pp1);


        }
        c.popMatrix();
        c.pushMatrix();
        {
            pp3 = t*0.125;
            c.translate(rs*8,rs2*3);
            c.texture(this.img0,0.25+pp3,1.5,2,2);
            pp1 = stepSmoothSquared(asint025);
            pp0 = rs2*pp1;
            pp2 = 20*(1-pp1);
            c.quad(0,pp2,pp0,0,pp0,rs2,0,rs2-pp2);
            c.noTexture();
            c.fill(50,0,50,1-pp1);
            c.quad(0,pp2,pp0,0,pp0,rs2,0,rs2-pp2);


            c.pushMatrix();
            c.translate(pp0,0);
            c.texture(this.img1,0.25,0.25+pp3,2,2);
            pp0 = rs2-pp0;
            pp2 = 20*(pp1);
            c.quad(0,0,pp0,pp2,pp0,rs2-pp2,0,rs2);
            c.noTexture();
            c.fill(255,pp1);
            c.quad(0,0,pp0,pp2,pp0,rs2-pp2,0,rs2);

            c.popMatrix();

            c.translate(rs2,0);
            c.texture(this.img1,0.75,0.25+pp3,2,2);
            pp1 = 1-stepSmoothSquared(asint025);
            pp0 = rs2*pp1;
            pp2 = 20*(1-pp1);
            c.quad(0,pp2,pp0,0,pp0,rs2,0,rs2-pp2);
            c.noTexture();
            c.fill(50,0,50,1-pp1);
            c.quad(0,pp2,pp0,0,pp0,rs2,0,rs2-pp2);

            c.translate(pp0,0);
            c.texture(this.img0,0.75+pp3,0.5,2,2);
            pp0 = rs2-pp0;
            pp2 = 20*(pp1);
            c.quad(0,0,pp0,pp2,pp0,rs2-pp2,0,rs2);
            c.noTexture();
            c.fill(255,pp1);
            c.quad(0,0,pp0,pp2,pp0,rs2-pp2,0,rs2);



        }
        c.popMatrix();
        c.pushMatrix();
        {
            c.translate(rs2,rs*4);


            c.stroke(30);
            c.noFill();
            c.rect(0,0,rs2,rs2);

            //c.setPixelPerfect(false);




            verticesB = [];

            var x,y;

            verticesA = [];

            pa = 3+floor(7*stepSquared(asint025));
            ps =rs2/(pa-1);

            i = -1;
            while(++i < (pa-1))
            {
                j = -1;
                while(++j < pa-1)
                {
                    c.rect(ps*i,ps*j,ps,ps);
                }
            }

            c.stroke(20);


            ps =rs2/(pa-1);

            i = -1;
            while(++i < (pa-1)*2)
            {
                j = -1;
                while(++j < pa-1)
                {
                    c.rect(rs4+rs2+ps*i,ps*j,ps,ps);
                }
            }

            c.noStroke();
            c.fill(40);
            i = -1;
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,i/(pa-1)));

                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);

            }
            c.stroke(40);
            c.lines(verticesA);

            i = -1;


            verticesA = [];



            i = -1;
            c.fill(80);
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,stepSmooth(i/(pa-1))));
                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);
            }
            c.stroke(80);
            c.lines(verticesA);

            verticesA = [];

            i = -1;
            c.fill(120);
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,stepSquared(i/(pa-1))));
                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);
            }
            c.stroke(120);
            c.lines(verticesA);

            verticesA = [];

            i = -1;
            c.fill(160);
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,stepInvSquared(i/(pa-1))));
                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);
            }
            c.stroke(160);
            c.lines(verticesA);

            verticesA = [];



            i = -1;
            c.fill(200);
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,stepCubed(i/(pa-1))));
                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);
            }
            c.stroke(200);
            c.lines(verticesA);

            verticesA = [];

            i = -1;
            c.fill(240);
            while(++i < pa)
            {
                x = i*ps;
                y =rs2-(lerp(rs2,0,stepInvCubed(i/(pa-1))));
                verticesA.push(x,y);
                c.rect(x-2, y-2,4,4);
            }
            c.stroke(240);
            c.lines(verticesA);

            c.noStroke();
            c.translate(rs4,0);

            pp1 = asint;
            pp0 = 4+6*stepCubed(pp1);
            pp2 = asint025;
            x = (rs2+pp0)+stepSmooth(pp2)*(rs*4-pp0*2);
            y = (rs2-pp0)-stepCubed(pp2)*(rs2-pp0*2);
            c.fill(stepCubed(pp1)*100,0,0);
            c.circle(x,y,pp0);
            pp2 = abs(sin(t*0.25+PI*0.05));
            x = (rs2+pp0)+stepSmoothSquared(pp2)*(rs*4-pp0*2);
            y = (rs2-pp0)-stepSmoothSquared(pp2)*(rs2-pp0*2);
            c.fill(stepSquared(pp1)*100,0,0);
            c.circle(x,y,pp0);
            pp0 = 4+6*stepSmoothInvSquared(pp1);

            pp2 = abs(sin(t*0.25+PI*0.25));

            x = (rs2+pp0)+stepSmoothInvSquared(pp2)*(rs*4-pp0*2);
            y = (rs2-pp0)-stepSmoothInvSquared(pp2)*(rs2-pp0*2);

            c.fill(stepSmoothInvSquared(pp1)*100,0,0);
            c.circle(x,y,pp0);

            pp2 = abs(sin(t*0.25+PI*0.5));
            pp0 = 4+6*stepSmoothInvSquared(pp1);

            x = (rs2+pp0)+stepSmoothCubed(pp2)*(rs*4-pp0*2);
            y = (rs2-pp0)-stepSmoothCubed(pp2)*(rs2-pp0*2);

            c.fill(stepSmoothInvSquared(pp1)*100,0,0);
            c.circle(x,y,pp0);

    }
        c.popMatrix();

        c.pushMatrix();
        {


        }
        c.popMatrix();

        c.pushMatrix();
        {
            pp0 = 0.25+0.75*asint025;
            c.translate(0,rs*6);
            c.texture(this.img2,(sin(t*0.25)),cos(t*0.25),pp0,pp0);
            c.rect(0,0,rs2,rs2);
            c.noTexture();
        }
        c.popMatrix();


    }
    c.popMatrix();

    c.noStroke();
    c.pushMatrix();
    {


    }
    c.popMatrix();
};




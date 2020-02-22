class ModelMaker {
    makeLantern() {
		let lantern = new Object3d();

		let height = 3.5;
		let postRadius = 0.08;
		let bulbRadius = 0.2;
		let res = 40;
		
		let post = this.makeCylindre(height, postRadius, res, 1, 1);
		let bulb = gSurfaceCreator.makeSphere(bulbRadius, res);
		bulb.translate([0.0, height/2+bulbRadius/3, 0.0]);

		let postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("brown");
		postMaterial.setRoughness("brown");
		postMaterial.setMetallic("brown");
		post.setMaterial(postMaterial);
		
		//post.setMaterial(new DefaultMaterial(makeRgb(222, 184, 135)));
		//bulb.setMaterial(new DefaultMaterial(makeRgb(255,248,220)));
		gTextureManager.createTextureFromArray("simil_white", new Uint8Array([255.0,248.0,220.0])); //Change with image texture

		let bulbMaterial = new PBRMaterial();
		bulbMaterial.setAlbedo("white");
		//bulbMaterial.setRoughness("Marble01_roughness");
		//bulbMaterial.setMetallic("Marble01_metallic");
		bulbMaterial.setNormalMap("Marble01_normal");
		//bulbMaterial.setMetallic("metal_titanium_metallic");
		//bulbMaterial.setAmbientOcclusion("metal_titanium_metallic");
		bulb.setMaterial(bulbMaterial);
		
		lantern.addChild(post);
		lantern.addChild(bulb);

		lantern.translate([0,height/2,0]);
		return lantern;
	}
	

	makeCart(){
		let cart = new Object3d();

		//BODY
		let h = 1/16;
		let w = 1.2;
		let form = {
			"positions" : [
			[0.0, -h/2, -w/2],
			[0.0, h/2, -w/2],
			[0.0, h/2, w/2],
			[0.0, -h/2, w/2],
			[0.0, -h/2, -w/2]
			],
			"normals" : [
			[0.0, -h/2, 0],
			[0.0, h/2, 0],
			[0.0, h/2, 0],
			[0.0, -h/2, 0],
			[0.0, -h/2, 0]
			],
			"amountOfVertices" : 5
		};


		let curve = new BezierCurve([
			[0,	-0.238,	0.299],
			[0,	-0.353,	0.299],
			[0,	-0.44,	0.211],
			[0,	-0.438,	0.099],
			[0,	-0.438,	0.099],
			[0,	-0.438,	0.057],
			[0,	-0.438,	0.032],
			[0,	-0.438,	-0.001],
			[0,	-0.438,	-0.001],
			[0,	-0.44,	-0.111],
			[0,	-0.35,	-0.2],
			[0,	-0.238,	-0.2],
			[0,	-0.238,	-0.2],
			[0,	-0.156,	-0.2],
			[0,	-0.076,	-0.2],
			[0,	0,	-0.2],
			[0,	0,	-0.2],
			[0,	0.076,	-0.2],
			[0,	0.156,	-0.2],
			[0,	0.238,	-0.2],
			[0,	0.238,	-0.2],
			[0,	0.35,	-0.2],
			[0,	0.44,	-0.111],
			[0,	0.438,	-0.001],
			[0,	0.438,	-0.001],
			[0,	0.438,	0.032],
			[0,	0.438,	0.057],
			[0,	0.438,	0.099],
			[0,	0.438,	0.099],
			[0,	0.44,	0.211],
			[0,	0.353,	0.299],
			[0,	0.238,	0.299]
		]);

		let body = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, curve, 200,1,1);
		body.rotate(-Math.PI/2, [1,0,0]);
		let bodyMaterial = new PBRMaterial();
		bodyMaterial.setAlbedo("yellow");
		bodyMaterial.setRoughness("white");
	    //bodyMaterial.setMetallic("metal_titanium_metallic");
	    bodyMaterial.setAmbientOcclusion("white");
	    bodyMaterial.setNormalMap("blue");
		body.setMaterial(bodyMaterial);

		//body.setMaterial(new DefaultMaterial(makeRgb(253,210,5)));
		cart.addChild(body);
		
		//CHAIRS
		let chairs = new Object3d();
		let wChair = 0.5;
		let lChair = 0.4;
		let hChair = 0.03*2;

		let chairMaterial = new PBRMaterial();
		chairMaterial.setAlbedo("green");
		chairMaterial.setRoughness("green");
		chairMaterial.setMetallic("green");

		let chair = this.makeChair(wChair,lChair,hChair, chairMaterial ,chairMaterial);
		chair.translate([lChair/2,0,0]);
		chairs.addChild(chair);

		chair = this.makeChair(wChair,lChair,hChair, chairMaterial, chairMaterial,chairMaterial );
		let footSpace = 0.2;
		chair.translate([-lChair/2-footSpace,0,0]);//-0.2 for foot space
		chairs.addChild(chair);

		//len total = 0.4 + 0.4 + 0.2 = 1 --> w Cart is 1.2
		chairs.translate([lChair*2+footSpace-w+hChair/2+0.01,0,0]);
		cart.addChild(chairs);

		//COVER
		let wCover = w/2;
		let cover = this.makeCover(wCover);
		cover.translate([-w,0,-h/2]);
		cover.translate([0,0,1/16/2]);
		cover.scale([1,0.65,0.55]);

		let coverMaterial = new PBRMaterial();

		coverMaterial.setAlbedo("yellow");
		coverMaterial.setRoughness("white");
	    coverMaterial.setAmbientOcclusion("white");
	    coverMaterial.setNormalMap("blue");

		cover.setMaterial(coverMaterial);
		cart.addChild(cover);

		cover = this.makeCover(wCover);
		cover.scale([-1,1,1]);
		cover.translate([-w,0,-h/2]);
		cover.translate([0,0,1/16/2]);
		cover.scale([1,0.65,0.55]);
		coverMaterial = new PBRMaterial();

		coverMaterial.setAlbedo("yellow");
		coverMaterial.setRoughness("white");
	    coverMaterial.setAmbientOcclusion("white");
	    coverMaterial.setNormalMap("blue");

		cover.setMaterial(coverMaterial);	
		
		cart.addChild(cover);
		
		
		return cart;
	}

	makeCover(wCover){
		let form = new BezierCurve([
			[0,	-0.238,	0.299],
			[0,	-0.353,	0.299],
			[0,	-0.44,	0.211],
			[0,	-0.438,	0.099],

			[0,	-0.438,	0.099],
			[0,	-0.438,	0.057],
			[0,	-0.438,	0.032],
			[0,	-0.438,	-0.001],

			[0,	-0.438,	-0.001],
			[0,	-0.44,	-0.111],
			[0,	-0.35,	-0.2],
			[0,	-0.238,	-0.2],

			[0,	-0.238,	-0.2],
			[0,	-0.156,	-0.2],
			[0,	-0.076,	-0.2],
			[0,	0,	-0.2],

			[0,	0,	-0.2],
			[0,	0.076,	-0.2],
			[0,	0.156,	-0.2],
			[0,	0.238,	-0.2],

			[0,	0.238,	-0.2],
			[0,	0.35,	-0.2],
			[0,	0.44,	-0.111],
			[0,	0.438,	-0.001],

			[0,	0.438,	-0.001],
			[0,	0.438,	0.032],
			[0,	0.438,	0.057],
			[0,	0.438,	0.099],

			[0,	0.438,	0.099],
			[0,	0.44,	0.211],
			[0,	0.353,	0.299],
			[0,	0.238,	0.299],

			[0,	0.238,	0.299],
			[0,	0.156,	0.299],
			[0,	0.076,	0.299],
			[0,	0,	0.299],
			
			[0,	0,	0.299],
			[0,	-0.076,	0.299],
			[0,	-0.156,	0.299],
			[0,	-0.238,	0.299]		
		]).setDefaultNormal([1,0,0]).makeForm(20);
		
		let transform = mat4.create();
		mat4.translate(transform, transform, [wCover, 0,0]);
		mat4.scale(transform, transform, [2,1.6,2]);
		let cover = gSurfaceCreator.excrute(form, transform);
		cover.rotate(-Math.PI/2, [1,0,0]);

		return cover;
	}
	

	makeCarousel(height, amount){
		let carousel = new Object3d();

		//gray Post
		let postRadius = 0.3;
		let res = 40; //resolution
		let repeatX = 8 //agarra 8 discretizaciones
		let repeatY = 3
		let post = this.makeCylindre(height, postRadius, res, 1, height);
		post.translate([0.0, height/2, 0.0]);
		carousel.addChild(post);
		let postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("Star_and_Cross_albedo");
		postMaterial.setRoughness("Star_and_Cross_roughness");
		postMaterial.setMetallic("Star_and_Cross_metallic");
		postMaterial.setAmbientOcclusion("Star_and_Cross_ao");
		postMaterial.setNormalMap("Star_and_Cross_normal");
		post.setMaterial(postMaterial);
		//post.setMaterial(new DefaultMaterial(makeRgb(165, 165,165)));

		//blue Post Cylindre down
		let heightBCD=height/4;
		post = this.makeCylindre(heightBCD, postRadius*1.5, res,1,1);
		//post.setMaterial(new DefaultMaterial(makeRgb(59, 131, 189)));
		post.translate([0.0, heightBCD/2, 0.0]);
		carousel.addChild(post);
		postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("blue");
		postMaterial.setRoughness("blue");
		postMaterial.setMetallic("blue");
		postMaterial.setAmbientOcclusion("blue");
		post.setMaterial(postMaterial);
		//blue Post Cylindre up
		let heightBCU=heightBCD/4;
		post = this.makeCylindre(heightBCU, postRadius*1.3, res,1,1);
		post.setMaterial(new DefaultMaterial(makeRgb(59, 131, 189)));
		post.translate([0.0, heightBCU/2+heightBCD+height*0.05, 0.0]);
		carousel.addChild(post);
		postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("blue");
		postMaterial.setRoughness("blue");
		postMaterial.setMetallic("blue");
		postMaterial.setAmbientOcclusion("blue");
		post.setMaterial(postMaterial);
		//blue Post cone down
		let heightBConeD=height*0.3+heightBCU;
		post = this.makeCone(heightBConeD, postRadius*1.5, res,1,1);
		post.setMaterial(new DefaultMaterial(makeRgb(59, 131, 189)));
		post.translate([0.0, heightBCD, 0.0]);
		carousel.addChild(post);
		postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("blue");
		postMaterial.setRoughness("blue");
		postMaterial.setMetallic("blue");
		postMaterial.setAmbientOcclusion("blue");
		post.setMaterial(postMaterial);
		//blue Post cone up
		let heightBConeU=height*0.2;
		post = this.makeCone(heightBConeU, postRadius*1.3, res,1,1);
		post.setMaterial(new DefaultMaterial(makeRgb(59, 131, 189)));
		post.translate([0.0,heightBCU+heightBCD+height*0.05, 0.0]);
		carousel.addChild(post);
		postMaterial = new PBRMaterial();
		postMaterial.setAlbedo("blue");
		postMaterial.setRoughness("blue");
		postMaterial.setMetallic("blue");
		postMaterial.setAmbientOcclusion("blue");
		post.setMaterial(postMaterial);

		//swivel ceiling
		let heightCeiling = 2.0/6;
		let ceilingRadius = postRadius*6;
		let ceiling = this.makeCylindre(heightCeiling, ceilingRadius, res, 4,2);
		let ceilingMaterial = new PBRMaterial();
		ceilingMaterial.setAlbedo("green_rough_planks_albedo");
		ceilingMaterial.setRoughness("green_rough_planks_roughness");
		ceilingMaterial.setMetallic("green_rough_planks_metallic");
		ceilingMaterial.setAmbientOcclusion("green_rough_planks_ao");
		ceilingMaterial.setNormalMap("green_rough_planks_normal");
		ceiling.setMaterial(ceilingMaterial);

		//ceiling.setMaterial(new DefaultMaterial(makeRgb(237, 118, 14)));
		ceiling.translate([0.0, height+heightCeiling/2, 0.0]);
		ceiling.speed = 0;
		ceiling.speedRandomRotation = 0.000001;
	    ceiling.accel = 0.0000001;
	    ceiling.speedLimit = 0.002;
	    ceiling.vectorRotation = [0, 1, 0];
	    ceiling.vectorRandomRotation = [1, 0, 0];
	    //ceiling.angleMin = -Math.PI/4;
	    //ceiling.angleMax = Math.PI/4;
		ceiling.randomAngle = 0;
		ceiling.totalAngle = 0;
		ceiling.lastAngle = 0;
	    const ceilingAnimationUpdate = (object) => {
		// rotate random ceilling
			object.rotate(-object.lastAngle, object.vectorRandomRotation);
			object.rotate(Math.PI * object.speed * gDeltaTime , object.vectorRotation);
			object.rotate(object.totalAngle, object.vectorRandomRotation);
	    }
	    const ceilingUpdate = (object) => {
			if (object.speed <= object.speedLimit) {
				object.speed += object.accel * gDeltaTime;
			} else {
				object.accel = 0;
			}
			if (object.totalAngle>=Math.PI/25) {object.totalAngle = Math.PI/25; object.dir = -1;}
			else if(object.totalAngle<=0){object.totalAngle = 0; object.dir = 1;}
			object.randomAngle = (Math.PI/3600)*object.dir;
			object.lastAngle = object.totalAngle;
			object.totalAngle+=object.randomAngle;
		}
	    
	    let animationCeiling = new Animation(ceilingAnimationUpdate);
	    ceiling.addAnimation(animationCeiling);
	    ceiling.setBehaviour(ceilingUpdate);

		let threads = new Object3d();
		let tita = Math.PI*2/amount;
		let heightThread = height-heightBCD;
	        let trhreadRadius = 0.03;
	    	const threadAnimationUpdate = (object) => {
		    // rotate chairs by centrifugal force
		    object.translate([-ceilingRadius*3/4,(heightThread)/2+heightCeiling/2,0]);
		    object.rotate(object.speed() * gDeltaTime, object.rotationAxis);
		    object.translate([ceilingRadius*3/4,-(heightThread)/2-heightCeiling/2,0]);
		}
	    
	        for(let i=0; i<amount; i++){
		    let thread = this.makeCylindre(heightThread, trhreadRadius, res,1,1);

		    // Let's see how this looks. Instead of creating an object, just create it here. 
		    thread.speed = () => { return ceiling.accel*300};
		    thread.rotationAxis = [-1, 0, 0];
		    thread.setMaterial(new DefaultMaterial(makeRgb(28, 28, 28)));
		    let animation = new Animation(threadAnimationUpdate);
		    thread.addAnimation(animation);
		    
			//chair
			let chairMaterial = new PBRMaterial();
			chairMaterial.setAlbedo("violet");
			chairMaterial.setRoughness("violet");
			chairMaterial.setMetallic("violet");
			
		    let chair = this.makeChair(1/2,1/2,trhreadRadius*2,chairMaterial,chairMaterial);
		    chair.translate([0.0,-(heightThread)/2,0.0]);
		    
		    thread.addChild(chair);
		    thread.rotate(i*Math.PI*2/amount,[0.0,1.0,0.0]);
		    thread.translate([ceilingRadius*3/4,-(heightThread)/2-heightCeiling/2,0]);
		    thread.rotate(Math.PI/2,[0.0,1.0,0.0]);
		    
		    threads.addChild(thread);
		}
		ceiling.addChild(threads);
		carousel.addChild(ceiling);
		
		return carousel;
	}


	makeChair(w,l,h,material1, material2){
		let chair = new Object3d();
		let cube = this.makeCube(w,l,h);
		//cube.setMaterial(new DefaultMaterial(makeRgb(r, g, b)));
		cube.setMaterial(material1);
		cube.translate([-h/2,0.0,0.0]);
		chair.addChild(cube);
		let cube2 = this.makeCube(w,l,h);
		cube2.rotate(Math.PI/2,[0,0,1]);
		//cube2.setMaterial(new DefaultMaterial(makeRgb(r, g, b)));
		cube2.setMaterial(material2);
		chair.addChild(cube2);
		return chair;
	}


	makeCone(h, r, res, repeatTextureX, repeatTextureY){
		let form = {
			"positions" : [
			[0.0, 0.0,0.0],
			[r, 0.0, 0.0],
			[0, h, 0.0]
			],
			"normals" : [
				[0.0, 1.0, 0.0],
				[0.0, 1.0, 0.0],
				[0.0, 1.0, 0.0]
			],
			"amountOfVertices" : 3
		};
		
		return gSurfaceCreator.makeRevolutionSurface(form, 360, res, repeatTextureX, repeatTextureY);
	}


    makeCylindre(h, r, res, repeatTextureX, repeatTextureY) {
	let form = {
	    "positions" : [
		[0.0, h/2, 0.0], 
		[r, h/2, 0.0],
		[r, h/2, 0.0],
		[r, -h/2, 0.0],
		[r, -h/2, 0.0],
		[0.0, -h/2, 0.0]
	    ],
	    "normals" : [
		[0, 1.0, 0.0],
		[0, 1.0, 0.0],
		[1, 0.0, 0.0],
		[1, 0.0, 0.0],
		[0, -1.0, 0.0],
		[0, -1.0, 0.0]
	    ],
	    "amountOfVertices" : 6
	};
	
	return gSurfaceCreator.makeRevolutionSurface(form, 360, res, repeatTextureX, repeatTextureY);
    }


    makeRollerCoaster(path, amountOfPillars) {
	let FORM_SAMPLE_AMOUNT = 200;
	let sideFace = new BezierCurve([[0.0, -0.1303, -0.0017],
		[0.0, -0.1304, -0.1816],
		[0.0, 0.1271, -0.2535],
		[0.0, 0.1299, -0.4376],
		[0.0, 0.1299, -0.4376],
		[0.0, 0.1314, -0.4617],
		[0.0, 0.1342, -0.463],
		[0.0, 0.1688, -0.4617],
		[0.0, 0.1688, -0.4617],
		[0.0, 0.2105, -0.4617],
		[0.0, 0.2493, -0.4617],
		[0.0, 0.2888, -0.4617],
		[0.0, 0.2888, -0.4617],
		[0.0, 0.3503, -0.463],
		[0.0, 0.3712, -0.4421],
		[0.0, 0.3697, -0.4017],
		[0.0, 0.3697, -0.4017],
		[0.0, 0.3297, -0.4017],
		[0.0, 0.2897, -0.4017],
		[0.0, 0.25, -0.4017],
		[0.0, 0.25, -0.4017],
		[0.0, 0.247, -0.2001],
		[0.0, 0.1332, -0.2001],
		[0.0, 0.1306, -0.0027],
		[0.0, 0.1306, -0.0027],
		[0.0, 0.1332, 0.2001],
		[0.0, 0.247, 0.2001],
		[0.0, 0.25, 0.4017],
		[0.0, 0.25, 0.4017],
		[0.0, 0.2897, 0.4017],
		[0.0, 0.3297, 0.4017],
		[0.0, 0.3697, 0.4017],
		[0.0, 0.3697, 0.4017],
		[0.0, 0.3712, 0.4421],
		[0.0, 0.3503, 0.463],
		[0.0, 0.2888, 0.4617],
		[0.0, 0.2888, 0.4617],
		[0.0, 0.2493, 0.4617],
		[0.0, 0.2105, 0.4617],
		[0.0, 0.1688, 0.4617],
		[0.0, 0.1688, 0.4617],
		[0.0, 0.1342, 0.463],
		[0.0, 0.1314, 0.4617],
		[0.0, 0.1299, 0.4376],
		[0.0, 0.1299, 0.4376],
		[0.0, 0.1271, 0.2535],
		[0.0, -0.1304, 0.1816],
		[0.0, -0.1303, 0.0017]]);
	
	sideFace.scale([1,1.4,1.8]);
	let form = sideFace.makeForm(FORM_SAMPLE_AMOUNT);

	let samplesAmount = 200;
	let rollerCoaster = new Object3d();
	
	let tracks = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, path, samplesAmount, 0.5,10);
	
	let tracksMaterial = new PBRMaterial();
	tracksMaterial.setAlbedo("concrete_albedo");
	tracksMaterial.setRoughness("concrete_roughness");
	tracksMaterial.setMetallic("concrete_metallic");
	tracksMaterial.setAmbientOcclusion("concrete_ao");
	tracksMaterial.setNormalMap("concrete_normal");
	tracksMaterial.setReflectionMap("skybox");
	tracksMaterial.setReflectionIntensity(0.5);
	tracks.setMaterial(tracksMaterial);
	rollerCoaster.addChild(tracks);

	let pillarTransforms = path.getUniformSampling(amountOfPillars);
	for (let i = 0; i < pillarTransforms.length; i++) {
	    let pillarPosition = pillarTransforms[i].slice(12,15);
	    let pillar = this.makeCylindre(pillarPosition[1], 0.2, 20, 1, 1);
	    //pillar.setMaterial(new DefaultMaterial(makeRgb(132, 115, 90)));
	    pillar.translate([pillarPosition[0],pillarPosition[1]/2.0, pillarPosition[2]]);

	    //texture
	    let pillarMaterial = new PBRMaterial();
	    pillarMaterial.setAlbedo("metal_titanium_albedo");
	    pillarMaterial.setAmbientOcclusion("black");
	    pillarMaterial.setRoughness("metal_titanium_roughness");
	    pillarMaterial.setMetallic("metal_titanium_metallic");
	    pillarMaterial.setNormalMap("metal_titanium_normal");
	    pillarMaterial.setReflectionMap("skybox");
	    pillar.setMaterial(pillarMaterial);
	    rollerCoaster.addChild(pillar);
	}

	return rollerCoaster;
    }


    makeCube(w, l, h) {
		let form = {
			"positions" : [
			[0.0, -h/2, -w/2],
			[0.0, h/2, -w/2],
			[0.0, h/2, w/2],
			[0.0, -h/2, w/2],
			[0.0, -h/2, -w/2]
			],
			"normals" : [
			[0.0, -h/2, 0],
			[0.0, h/2, 0],
			[0.0, h/2, 0],
			[0.0, -h/2, 0],
			[0.0, -h/2, 0]
			],
			"amountOfVertices" : 5
		};

		let curve = new BezierCurve([[0.0,0.0,0.0], [l,0.0,0.0], [l,0.0,0.0], [l,0.0,0.0]]);
		return gSurfaceCreator.makeSurfaceFromFormAndCurve(form, curve, 2,1,1);
	}
	
	makeBridge(h,w,position){
	let form = {
			"positions" : [
			[0.0, -h/2, -w/2],
			[0.0, h/2, -w/2],
			[0.0, h/2, 0], 
			[0.0, h/2, w/2],
			[0.0, -h/2, w/2],
			[0.0, -h/2, 0], 
			[0.0, -h/2, -w/2]
			],
			"normals" : [
			[0, 0, -1],
			[0, 0, -1],
			[0, 1, 0],
			[0, 0, 1],
			[0, 0, 1],
			[0, -1, 0],
			[0, 0, -1]
			],
			"amountOfVertices" : 7
		};
		let bridge = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, new BezierCurve([[0, 0, 0], [8, 0,0], [8,0,6], [0,0,6]]), 50,2,5);
		bridge.translate(position);
		bridge.rotate(Math.PI/2, [0,0,1]);
		return bridge;
	}
}

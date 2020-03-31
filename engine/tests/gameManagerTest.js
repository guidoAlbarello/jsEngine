function assertEQ( x, y, errmsg ) {
	if ( x != y ) {
		console.log("%cTEST FAILED " + errmsg, "color: red");
		console.log( x + " not equal to " + y );
		console.log("\n");
	} else {
		console.log("%cTEST PASSED " + errmsg, "color: green");

	}
}

function testAllOrgansCollected() {
	let s = new Scene();
	let gm = new GameManager( s, new Map([
		[ "liver", 1 ],
		[ "brain", 1 ],
		[ "heart", 1 ]
	]) );
	let inventorySuccess = new Map([
		[ "liver", 1 ],
		[ "brain", 1 ],
		[ "heart", 1 ]
	]);
	let inventoryFail = new Map([
		[ "liver", 1 ],
		[ "brain", 1 ]
	]);

	assertEQ( gm._allOrgansCollected( inventorySuccess ), true, "Game is over if inventory fulfills objective");
	assertEQ( gm._allOrgansCollected( inventoryFail ), false, "Game isn't over if inventory doesn't fulfill objective");


}

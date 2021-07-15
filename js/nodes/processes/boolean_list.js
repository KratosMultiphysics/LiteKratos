
function BooleanList (){
    this.addOutput("", "process_array");
    this.xposi = this.addWidget("toggle","x",true,);
    this.yposi = this.addWidget("toggle","y",true,);
    this.zposi = this.addWidget("toggle","z",true,);
}
BooleanList.title = "Boolean list";
BooleanList.desc = "Merges several boolean into an array";

BooleanList.prototype.onExecute = function() {
    this.setOutputData(0, [this.xposi.value, this.yposi.value, this.zposi.value]);
};


LiteGraph.registerNodeType("processes/BooleanList", BooleanList);

console.log("BooleanList node created"); //helps to debug

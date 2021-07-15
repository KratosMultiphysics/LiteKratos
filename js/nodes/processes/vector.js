
function Vector () {
    this.addOutput("", "process_array");
    this.widget_1 = this.addWidget("number","X", 0, function(v){}, {});
    this.widget_2 = this.addWidget("number","Y", 0, function(v){}, {});
    this.widget_3 = this.addWidget("number","Z", 0, function(v){}, {});

};

Vector.title = "Vector";
Vector.desc = "Merges several number into an array";

LiteGraph.registerNodeType("processes/Vector", Vector);

console.log("Vector node created"); //helps to debug


Vector.prototype.onExecute = function() {
    this.setOutputData(0, [this.widget_1.value, this.widget_2.value, this.widget_3.value])
};


    
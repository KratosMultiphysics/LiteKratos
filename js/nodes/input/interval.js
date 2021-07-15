
function Interval(){
    this.addOutput("", "process_array");
    this.widget_1 = this.addWidget("number","Initial", 0, function(v){}, {});
    this.widget_2 = this.addWidget("text","Final", "End", function(v){}, {});


};

Interval.title = "Interval";
Interval.desc = "Time interval";

Interval.prototype.onExecute = function() {
    this.setOutputData(0, [this.widget_1.value, this.widget_2.value])
};

LiteGraph.registerNodeType("processes/interval", Interval);

console.log("Interval node created"); //helps to debug

    
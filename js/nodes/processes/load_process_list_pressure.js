
function AssignScalarVariableToConditionsProcess() {
    this.addInput("model_part_name","string");
    this.addInput("interval","process_array");

    this.properties = {
        "python_module" : "assign_scalar_variable_to_conditions_process",
        "kratos_module" : "KratosMultiphysics",
        "Parameters"    : {
            "model_part_name" : "Structure.COMPUTE_HROM.SurfacePressure3D_Pressure_on_surfaces_Auto4",
            "variable_name"   : "POSITIVE_FACE_PRESSURE",
            "value"           : "(-15000000*13) + t*15000000",
            "interval"        : [0.0,"End"]
        }
        
    };

        var that = this;
        this.variable_name = this.addWidget("text","VariableName", "", function(v){}, {} );
        this.value = this.addWidget("text","Value", "", function(v){}, {});


        this.addOutput("Process","process");

        this.size = this.computeSize();
        this.serialize_widgets = true;

    }

    AssignScalarVariableToConditionsProcess.title = "Load process list pressure";
    AssignScalarVariableToConditionsProcess.desc = "Node to specify a load process";

    AssignScalarVariableToConditionsProcess.prototype.onExecute = function() {
        myoutput = this.properties
    // model_part_name
    if (this.getInputData(0) != undefined) {
        myoutput["Parameters"]["model_part_name"] = this.getInputData(0)
    } else {
        myoutput["Parameters"]["model_part_name"] = this.properties["Parameters"]["model_part_name"]
    }
    // interval
    if (this.getInputData(1) != undefined) {
        myoutput["Parameters"]["interval"] = this.getInputData(1)
    } else {
        myoutput["Parameters"]["interval"] = this.properties["Parameters"]["interval"]
    }
  
        myoutput["Parameters"]["variable_name"] = this.variable_name.value
        myoutput["Parameters"]["value"] = this.value.value

        this.setOutputData(0,  myoutput);
    };

    LiteGraph.registerNodeType("processes/LoadProcessListPressure", AssignScalarVariableToConditionsProcess);
class ParsedModelPart {
    constructor() {
        this.input_manager = document.createElement('input');
        this.input_manager.type = 'file';
        this.input_manager.addEventListener('change', this.onSelection.bind(this));

        this.mp_select = this.addWidget("button", "Load Mdpa", "", function (value, widget, node) {
            console.log(node.input_manager.value);
            node.input_manager.click();
        });

        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    onExecute() {
        // Currently does nothing
    }

    onSelection(e) {
        const [file] = event.target.files;
        this.readSingleFile(file);
    }

    readSingleFile(file) {
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = this.onReaderLoad(file);
        reader.readAsText(file);
    };

    onReaderLoad(file) {
        return ({ target: { result } }) => {
            const mdpa_subs_re = /.*((Begin SubModelPart) ([a-zA-Z0-9_]+))|(End SubModelPart$)/gm;
            const sub_mdpa = result.matchAll(mdpa_subs_re);

            // Remove existing outputs
            while (this.outputs != undefined && this.outputs.length != 0) {
                this.removeOutput(0);
            }

            // Obtain the name of the ModelPart to get complete routes
            let sub_mdpa_namepath = file.name.slice(0, -5);

            // Obtain the Submodelparts
            this.addOutput(sub_mdpa_namepath, "string");
            for (const match of sub_mdpa) {
                if (match[0].includes("Begin")) {
                    sub_mdpa_namepath = `${sub_mdpa_namepath}.${match[3]}`;
                    this.addOutput(sub_mdpa_namepath, "string");
                } else {
                    sub_mdpa_namepath = sub_mdpa_namepath.split(".").slice(0, -1).join(".");
                }
            }

            this.size = this.computeSize();
        }
    }
}

ParsedModelPart.title = "ParsedModelPart";
ParsedModelPart.desc = "Parses a ModelPart";

LiteGraph.registerNodeType("model_part/ParsedModelPart", ParsedModelPart);

console.log("ParsedModelPart node created"); //helps to debug
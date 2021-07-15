
class DownloadProblem {
    constructor() {
        this.size = [60, 30];
        this.addInput("data", 0);
        this.addInput("download", LiteGraph.ACTION);
        this.properties = { filename: "data.json" };
        this.value = null;
        var that = this;
        this.addWidget("button", "Download", "", function (v) {
            if (!that.value)
                return;
            that.downloadAsFile();
        });
    }

    downloadAsFile() {
        if (this.value == null)
            return;

        var str = null;

        if (this.value.constructor === String)
            str = this.value;
        else
            str = JSON.stringify(this.value);

        var that = this;
        var zip = new JSZip();
            zip.file("ProjectParameters.json", new Blob([str]));

            Object.entries(problem_files["materials"]).forEach(([key, value]) => {
                zip.file(value["name"], new Blob([JSON.stringify(value["data"])]));
            });

            // var img = zip.folder("images");
            // img.file("smile.gif", imgData, {base64: true});
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                that.saveAs(content, "problem.zip");
        });
    }

    saveAs(file, name) {
        let url = URL.createObjectURL(file);
        let element = document.createElement("a");

        element.setAttribute('href', url);
        element.setAttribute('download', name);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000 * 60); //wait one minute to revoke url
    }

    onAction(action, param) {
        var that = this;
        setTimeout(function () { that.downloadAsFile(); }, 100); //deferred to avoid blocking the renderer with the popup
    }

    onExecute() {
        if (this.inputs[0]) {
            this.value = this.getInputData(0);
        }
    }

    getTitle() {
        if (this.flags.collapsed) {
            return this.properties.filename;
        }
        return this.title;
    }
}

DownloadProblem.title = "Download Problem";
DownloadProblem.desc = "Download all the files of the problem";

LiteGraph.registerNodeType("basic/DownloadProblem", DownloadProblem);

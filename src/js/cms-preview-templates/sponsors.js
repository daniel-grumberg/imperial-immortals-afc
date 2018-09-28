import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
        image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} subtitle={entry.getIn(["data", "subtitle"])}/>

        <div className="bg-white pv4">
          <div className="flex-l mhn1-l ph3 center mw7">
            <p className="w-60-l mb0">{entry.getIn(["data", "description"])}</p>
          </div>
        </div>

        <div className="bg-off-white pv4">
            <div class="center mb3 ph3">
                <div className="flex-ns flex-wrap mhn2-ns mb3">
                    {(entry.getIn(["data", "sponsors"]) || []).map((value, index) => <div className="ph2-ns w-50-ns mb4" key={index}>
                    <img src={value.get("image") && getAsset(value.get("image"))} alt="" className="center db mb3" style={{width: "240px"}}/>
                    <p className="mt0">{value.get("text")}</p>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
  }
}

import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class InformationPreview extends React.Component {
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
            <div class="center mb3 ph3">
                <div className="flex-ns flex-wrap mhn2-ns mb3">
                  {(entry.getIn(["data", "information"]) || []).map((value, index) => <div class="bg-grey-1 pv4">
                          <div class="flex-l mhn1-l ph3 center mw7">
                              <h2 class="f2 b lh-title mb2 w-40-l">{value.get("heading")}</h2>
                              <p class="w-60-l mb0">{value.get("text")}</p>
                          </div>
                      </div>)}
                </div>
            </div>
        </div>
    </div>
  }
}

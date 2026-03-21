import React, { Component } from 'react';
export default class Portfolio extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>Check Out Some of My Work.</h1>
            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {resumeData.portfolio &&
                resumeData.portfolio.map((item) => {
                  return (
                    <div key={item.name} className="columns portfolio-item">
                      <div className="item-wrap">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            item.location.startsWith('http')
                              ? item.location
                              : `${process.env.PUBLIC_URL}/${item.location}`
                          }
                        >
                          <img src={`${process.env.PUBLIC_URL}/${item.imgurl}`} className="item-img" alt={item.name} />
                          <div className="overlay">
                            <div className="portfolio-item-meta">
                              <h5>{item.name}</h5>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

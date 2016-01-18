
/*

    This is the Thomson Badge Mashlet ported to the latest Mashlet API.

    1) Create the following Service in Wires:
     add a DirectInvoke to the following URL: http://localhost:8080/mashlets/badge/badgeresponse.xml

    2) Save and publish as "SampleBadgeResponse"

    3) Add the following to mashlet.json:
    
    "Sample.Badge": {
                "type": "Sample.Badge",
                "title": "",
                "description": "Sample Inline Mashlet that demonstrates creation of a Badge",
                "properties": {
                },
                "resources": {
                    "js": [
                        { "script": "prototip-min.js", "property":"Prototip" },
                        { "script": "badge.js", "property":"Sample.Badge" }
                    ],
                    "css": ["#{mashletDir}/prototip.css"]

                }
            },

    4) Test using: http://localhost:8080/mashlets/standalone.jsp?mashlet=Sample.Badge
    Note: to do this, you have to restart the Server (as a default mashlet instance gets created on server restart).
    If you do not wish to restart, create a new Mashlet instance from the Type using the Mashlet Maker -> Create from TYpe


 */

Ema.namespace("badge");
badge = Class.create(Ema.Mashlet, {

    render: function() {

        var mashletsUrlContext = this.resolveUrl("#{mashletDir}/"); //getMashletsUrlContext();
        
        this.el.update("<img id='badge_" + this.el.id + "' src='" + mashletsUrlContext + (this.getPreference('size') != "small" ? "rid-idsymbol4" : "badge_sm") + ".gif' />");
        var el = $(this.el);
        var conn = this.getConnection();
        this.dataset = new Presto.Dataset({
            dataProxy: new Presto.ServiceDataProxy(conn)
        });


        this.dataset.load({
            sid: 'TSMashGetProfile',
            oid: 'get',
            params:{
                rid:this.getPreference('rid'),
                mode:'public',
                logmode:'badge',
                url:document.location.toString(),
                max:3
            }

        });
        this.dataset.addListener("load", function(ds) {

            var dsResponse = ds.getData().response;
            var data = dsResponse.ProfileResponse.profile;
            var privacy = dsResponse.ProfileResponse.DataPrivacy;
            var publications = [];
//            if(data.publications && data.publications.publication) {
//                publications = data.publications.publication;
//            }

            if(data.publications) {
                publications = data.publications;
                if (data.publications.constructor==Object) {
                    publications = [data.publications]
                }
            }

            if (privacy.publicProfile != "false")
            {
                this.tooltipContent = ["<div id='tooltip_" + this.el.id + "' style='color:#000000;background-color:#EFFFFF;'>",
                        "<table width=350px border=0   Cellpadding=0 cellspacing=0 style='font:12px Arial;'>",
                        "<tr>",
                        "<td width=350 height=20 style='background-image:url(" + mashletsUrlContext + "callout_logo.gif);background-repeat:no-repeat;color:#000000;background-color:#EFFFFF;'></td>",
                        "</tr>",
                        "<tr>",
                        "<td style='padding:15px;padding-top:5px;color:#000000;background-color:#EFFFFF;'>",
                        "<div style='font-weight:bold;color:#000000;background-color:#EFFFFF;' id='researcher'>",
                        data.firstName.replace(/</g,'&lt;').replace(/>/g,'&gt;') + " " + data.lastName.replace(/</g,'&lt;').replace(/>/g,'&gt;') + "<br>RID: " + data.researcherId + (data.institution != null ? "<br>" + data.institution.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ""),

                        "</div>",
                        "</td>",
                        "</tr>"
                        ]
                if (privacy.publicationsVisible != "false")
                {
                    if (publications && publications.length > 0)
                    {
                        //if (publications.constructor == Object)
                            //publications = [publications];                        
                        //var pubs = publications; //[0].publication;

                        var showTimeCited = data.showTimeCited;
                        
                        var listDescription = "Most cited publications:";
                        if (data.defaultSort != null) {
                            if (data.defaultSort == "Times Cited") {
                                listDescription = "Most cited publications:";
                            } else if (data.defaultSort == "Publication Year") {
                                listDescription = "Most recent publication date:";
                            } else if (data.defaultSort == "Date Added") {
						        listDescription = "Publications recently added to ResearcherID:";
							} else if (data.defaultSort == "Title") {
						        listDescription = "Selected publications:";
							}
                        }
                        

                        this.tooltipContent.push("<tr><td style='padding:5px;padding-left:15px;padding-top:0px;color:#000000;background-color:#EFFFFF;'><I>" + listDescription + "</td></tr>");
                        for (var i = 0; i < publications.length; i++)
                        {
                            var timeCited = "";
                            if ((showTimeCited) && (publications[i].wosArtifact == "true") && (publications[i].timesCitedNull == "false")){
                                timeCited = "<br>Times Cited: <b>" + publications[i].timesCited + "</b> <i>(Web of Science Core Collection&reg;)</i>" + "</br>";
                            }
                            
                            var title = publications[i].itemTitle;
                            
                            // For security html escape display data
                            if (title != null){
                            	title = title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                            }
                            
                            
                            this.tooltipContent.push(
                                    "<tr>",
                                    "<td style='padding:5px;padding-left:15px;padding-top:0px;color:#000000;background-color:#EFFFFF;' id='publications'>",
                                    "<b>" + (i + 1) + ". " + title + "</b>",
                                    timeCited,
                                    "</td>",
                                    "</tr>"
                                    );
                        }
                    }
                }
                this.tooltipContent.push(
                        "<tr>",
                        "<td align=left style='padding:10px;padding-right:25px;color:#000000;background-color:#EFFFFF;'>",
                        "<a target='reasearcherid' href='http://www.researcherid.com" + "/rid/" + data.researcherId + "' style='text-decoration:none;color:#3550CA;'>Go to ResearcherID.com to view more information</a>",
                        "</td>",
                        "</tr>",
                        "</table>",
                        "</div>"
                        );
            }
            else
            {
                this.tooltipContent = ["<div id='tooltip_" + this.el.id + "' style='color:#000000;background-color:#EFFFFF;'>",
                        "<table width=300px border=0   Cellpadding=0 cellspacing=0 style='font:12px Arial;'>",
                        "<tr>",
                        "<td width=350 height=20 style='background-image:url(" + mashletsUrlContext + "callout_logo.gif);background-repeat:no-repeat;color:#000000;background-color:#EFFFFF;'></td>",
                        "</tr>",
                        "<tr>",
                        "<td style='padding:15px;padding-top:5px;color:#000000;background-color:#EFFFFF;'>",
                        "<div style='font-weight:bold;color:#000000;background-color:#EFFFFF;' id='researcher'>",
                        "The Researcher has made their information on ResearcherID private.",
                        "</div>",
                        "</td>",
                        "</tr>",
                        "<tr>",
                        "<td align=left style='padding:10px;padding-right:25px;color:#000000;background-color:#EFFFFF;'>",
                        "Please visit <a target='reasearcherid' href='http://www.researcherid.com" + "/rid/" + data.researcherId + "' style='text-decoration:none;color:#3550CA;'>ResearcherID.com</a> to find other researchers",
                        "</td>",
                        "</tr>",
                        "</table>",
                        "</div>"
                        ]

            }


            var callout = [
                    "<img id='badge_" + this.el.id + "' src='" + mashletsUrlContext + (this.getPreference('size') != "small" ? "rid-idsymbol4" : "badge_sm") + ".gif' />"
                    ].join("");
            this.render = function() {
            };
            this.el.update(callout);
            var vThis = this;
            new Tip('badge_' + this.el.id, this.tooltipContent.join(""), { hideOn: { element: 'tip', event: 'mouseout'}, hideAfter: 1   });
        }, this);

    },

    onRefresh: function() {
        this.render();
    }

});
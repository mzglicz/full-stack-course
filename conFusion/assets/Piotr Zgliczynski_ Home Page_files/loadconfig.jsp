

// JSP to wrap the JSONP request to load the mashlet.json file





        Ema.containers['http://labs.researcherid.com:80'].mashletsConfig = ('          {            "Test.Chart":{              "type":"Test.Chart",              "version":"1.0",              "title":"Test.Chart Mashlet",              "small-icon":"small.gif",              "hideTitlebar":"true",              "medium-icon":"medium.gif",              "description":"Test.Chart Mashlet",              "properties":{                "dataUrl":{                  "type":"STRING",                  "description":"Data URL",                  "defaultValue":"/mashlets/Test.Chart/data.xml"                },                "chartUrl":{                  "type":"STRING",                  "description":"Chart URL",                  "defaultValue":"#{prestoResources}/common/js/FusionCharts/Charts/Bar2D.swf"                }                },              "resources":{                "js":[{                    "script":"FusionCharts.js",                    "property":"FusionCharts"                  },                  {                    "script":"main.js",                    "property":"Test.Chart"                  }                  ]                }              },            "CitedNetworkMap":{              "type":"CitedNetworkMap",              "version":"1.0",              "title":"Cited Network Author Map",              "hideTitlebar":"true",              "small-icon":"small.gif",              "medium-icon":"medium.gif",              "description":"This is djleon",              "properties":{                "helloString":{                  "type":"STRING",                  "description":"Hello String",                  "defaultValue":"Hello World!"                }                },              "resources":{                "js":[{                    "script":"main.js",                    "property":"CitedNetworkMap"                  },                  {                    "script":"http://www.google.com/jsapi",                    "property":"google"                  }                  ]                }              },            "badge":{              "type":"badge",              "title":"",              "description":"Sample Inline Mashlet that demonstrates creation of a Badge",              "properties":{                },              "resources":{                "js":[{                    "script":"prototip-min.js",                    "property":"Prototip"                  },                  {                    "script":"badge.js",                    "property":"badge"                  }                  ],                "css":[                  "#{mashletDir}/prototip.css"                ]                }              },            "HelloWorld":{              "type":"HelloWorld",              "title":"Hello World!",              "description":"A HelloWorld sample to demonstrate the basic Mashlet APIs ",              "properties":{                "helloString":"Hello World!"              },              "properties-meta":{                "helloString":{                  "type":"string",                  "description":"Hello String"                }                },              "resources":{                "js":[{                    "script":"hello.js",                    "property":"HelloWorld"                  }                  ]                }              },            "Presto.ServiceMashlet":{              "type":"Presto.ServiceMashlet",              "disallowInMashletMaker":"true",              "title":"Service Mashlet",              "description":"Generic mashlet type used to create basic mashlets for most Presto services. Instances of this mashlet type are generated using Mashlet Maker.",              "properties":{                "sid":"",                "oid":"",                "pageSize":"25",                "RSS_showPreviewByDefault":"false",                "disableRemotePaging":"false"              },              "authPolicy":"USER_LOGIN",              "resources":{                "libs":{                  "presto_ext":true                },                "js":[{                    "script":"main.js",                    "property":"Presto.ServiceMashlet"                  }                  ]                },              "properties-meta":{                "sid":{                  "readOnly":"true",                  "description":"Service Id"                },                "oid":{                  "readOnly":"true",                  "description":"Operation Id"                },                "pageSize":{                  "description":"Page size for Grid views"                },                "RSS_showPreviewByDefault":{                  "description":"Configuration to control whether the RSS items must be expanded by default"                },                "disableRemotePaging":{                  "description":"Disable remote paging. This will bring back all results of a Service invocation and hence it could result in bad performance"                }                }              },            "Sample.YahooMap":{              "type":"Sample.YahooMap",              "title":"Test.YahooMap Mashlet",              "description":"Use Case: Search for Local businesses and plot the results on a Map <br/> This sample demonstrates the the use of Yahoo Map view, Presto Connect to invoke services in Presto and Presto.Dataset to store the results",              "authPolicy":"USER_LOGIN",              "properties":{                "mapUrl":""              },              "resources":{                "libs":{                  "presto_ext":true                },                "js":[{                    "script":"#{prestoResources}/common/js/includeYahooMap.js",                    "property":"YMap"                  },                  {                    "script":"src.js",                    "property":"Sample.YahooMap"                  }                  ]                },              "properties-meta":{                "mapUrl":{                  "type":"STRING",                  "description":"Map URL"                }                }              },            "Presto.MashletCallout":{              "type":"Presto.MashletCallout",              "disallowInMashletMaker":"true",              "title":"Mashlet Callout",              "description":"",              "properties":{                "tag":"",                "calloutMashlet":""              },              "resources":{                "libs":{                  "presto_ext":true                },                "js":[{                    "script":"src.js",                    "property":"Presto.MashletCallout"                  }                  ]                }              },            "Amazon.Callout":{              "type":"Amazon.Callout",              "version":"1.0",              "disallowInMashletMaker":"true",              "title":"",              "description":"Quick Amazon Search Callout Mashlet",              "resources":{                "libs":{                  "presto_ext":true                },                "js":[{                    "script":"main.js",                    "property":"Amazon.Callout"                  }                  ],                "css":[                  "amazoncalloutmashlet.css"                ]                }              },            "Sample.RSSReader":{              "type":"Sample.RSSReader",              "title":"RSS Feeds",              "description":"Use case: Query Presto for all RSS services and let the user easily view these feeds. <br/> This demonstrates the use of the Presto RSSView API and Presto Connect.",              "authPolicy":"USER_LOGIN",              "width":"600",              "height":"350",              "resources":{                "libs":{                  "presto_ext":"true"                },                "js":[{                    "script":"rss2.js",                    "property":"Sample.RSSReader"                  }                  ],                "css":[                  "rssreader.css"                ]                }              },            "Presto.Portlet.ServiceMashlet":{              "type":"Presto.Portlet.ServiceMashlet",              "version":"1.0",              "title":"",              "disallowInMashletMaker":"true",              "description":"Built-in Presto mashlet that allows services to be exposed as Portlets.",              "properties":{                "sid":"",                "oid":""              },              "properties-meta":{                "sid":{                  "type":"STRING",                  "description":"Service Id"                },                "oid":{                  "type":"STRING",                  "description":"Operation Id"                }                },              "resources":{                "libs":{                  "presto_ext":true                },                "js":[                  "portlet.js",                  "renderer.js"                ],                "css":[                  "portlet.css"                ]                },              "renderers":[{                  "name":"Presto.Portlet.Renderer.SingleColumnTable",                  "title":"Single Column Table",                  "description":"Renders results in a single column. If multiple fields are configured, record fields will be displayed vertically one below the other.",                  "config":{                    "properties":[],                    "columns":[{                        "name":"columns",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.SingleRowTable",                  "title":"Single Row Table",                  "description":"Renders results in a single row with each record from results in a separate column. If multiple fields are configured, record fields are displayed vertically one below the other.",                  "config":{                    "properties":[],                    "columns":[{                        "name":"columns",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.RSSFeed",                  "title":"RSS Feeds",                  "description":"Renders RSS feeds in the default news feed format."                },                {                  "name":"Presto.Portlet.Renderer.Table",                  "title":"Table",                  "description":"Renders results a table format. Suitable for services that return multiple rows and columns of data.",                  "config":{                    "properties":[],                    "columns":[{                        "name":"columns",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.ExtTable",                  "title":"ExtJS Table",                  "description":"Renders results a table using ExtJS toolkit. Suitable for services that return multiple rows and columns of data.",                  "config":{                    "properties":[],                    "columns":[{                        "name":"columns",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.BarChart",                  "title":"Bar Chart",                  "description":"Renders a 3D bar chart, single set or multi set depending on the dataset. The first column supplies the x-axis values and subsequent columns supply numerical datasets appropriate for charts.",                  "config":{                    "properties":[{                        "name":"Chart Title",                        "type":"STRING"                      }                      ],                    "columns":[{                        "name":"X-Axis",                        "type":"COLUMN"                      },                      {                        "name":"Y-Axis",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.LineChart",                  "title":"Line Chart",                  "description":"Renders a line chart, single set or multi set depending on  the dataset. The first column supplies the x-axis values and subsequent columns supply numerical datasets appropriate for charts.",                  "config":{                    "properties":[{                        "name":"Chart Title",                        "type":"STRING"                      }                      ],                    "columns":[{                        "name":"X-Axis",                        "type":"COLUMN"                      },                      {                        "name":"Y-Axis",                        "type":"COLUMN_ARRAY"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.PieChart",                  "title":"Pie Chart",                  "description":"Renders pie chart using the dataset and columns selected. The first column supplies the x-axis value and the second column supplies numeric values appropriate for pie charts.",                  "config":{                    "properties":[{                        "name":"Chart Title",                        "type":"STRING"                      }                      ],                    "columns":[{                        "name":"Label",                        "type":"COLUMN"                      },                      {                        "name":"Data",                        "type":"COLUMN"                      }                      ]                    }                  },                {                  "name":"Presto.Portlet.Renderer.GoogleMap",                  "title":"Google Map",                  "description":"Renders makers on a Google map for the given set of latitude and longitude values. The marker label value will be displayed in a popup when users click on the marker.",                  "config":{                    "key":"ABQIAAAAWU-RytYlqGqaPmfH-hKiJxRPDaAnyVCOGTVXv-Sidw2mrpLM7xQgVJkngMrZ__VVeOV7t6bWyTEPHw",                    "properties":[{                        "name":"Default Zoom Level",                        "type":"STRING"                      }                      ],                    "columns":[{                        "name":"Latitude",                        "type":"COLUMN"                      },                      {                        "name":"Longitude",                        "type":"COLUMN"                      },                      {                        "name":"Marker Label",                        "type":"COLUMN"                      }                      ]                    }                  }                ]              },            "Sample.AmazonCallout":{              "type":"Sample.AmazonCallout",              "title":"",              "description":"Use case: Enrich an existing HTML page containing DVD Titles by creating a Callout that queries Amazon.com for the selected DVD title. <br/> This Mashlet does not have a UI of its own but adds behavior to existing components in the HTML page.",              "disallowPreviewInMashletMaker":"true",              "properties":{                "tag":""              },              "resources":{                "libs":{                  "presto_ext":"true"                },                "js":[{                    "script":"main.js",                    "property":"Sample.AmazonCallout"                  }                  ],                "css":[                  "amazoncalloutmashlet.css"                ]                }              },            "Sample.EmployeeList":{              "title":"Employees at San Jose",              "type":"Sample.EmployeeList",              "description":"Use Case: Search for employees in a Company location by their name/location/phone/department. <br/> Demonstrates the use of Presto.ServiceStore, Presto Connect and pagination of search results in a grid.",              "width":"500",              "height":"350",              "properties":{                "pageSize":"20"              },              "properties-meta":{                "pageSize":{                  "type":"STRING",                  "description":"Number of records in a single page"                }                },              "resources":{                "libs":{                  "presto_ext":"true"                },                "js":[{                    "script":"main.js",                    "property":"Sample.EmployeeList"                  }                  ]                }              },            "Sample.YUI.LocalSearch":{              "title":"Search local business listings",              "type":"Sample.YUI.LocalSearch",              "description":"Use Case: Search for local business listings <br/> Sample uses the YUI library.",              "width":"500",              "height":"350",              "disallowInMashletMaker":"true",              "properties":{                "numListings":"10"              },              "properties-meta":{                "pageSize":{                  "type":"STRING",                  "description":"Number of listings to display"                }                },              "resources":{                "js":[{                    "script":"http://yui.yahooapis.com/2.5.2/build/yuiloader/yuiloader-beta-min.js",                    "property":"YAHOO.util.YUILoader"                  },                  {                    "script":"src.js",                    "property":"Sample.YUI.LocalSearch"                  }                  ]                }              },            "xyz":{              "version":"1.0",              "title":"xyz",              "small-icon":"small.gif",              "medium-icon":"medium.gif",              "description":"xyz, created Thu Mar 12 12:11:27 EDT 2015",              "properties":{                },              "resources":{                "libs":{                  },                "js":[                  "src.js"                ]                },              "modes":[],              "type":"xyz"            },            "def":{              "version":"1.0",              "title":"def",              "small-icon":"small.gif",              "medium-icon":"medium.gif",              "description":"def, created Thu Mar 12 12:11:10 EDT 2015",              "properties":{                },              "resources":{                "libs":{                  },                "js":[]                },              "modes":[],              "type":"def"            }            }          ').evalJSON();

        



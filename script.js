/* =========================================
   RLI SELLERS PORTAL
   INVENTORY SYSTEM
========================================= */


/* =========================================
   SHOW MIDDLE HOUSING
========================================= */

function showHousing() {

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const inventorySection =
        document.getElementById("inventorySection");


    if (housingSection) {
        housingSection.style.display = "block";
    }

    if (condoSection) {
        condoSection.style.display = "none";
    }

    if (inventorySection) {
        inventorySection.style.display = "none";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SHOW MIDDLE CONDO
========================================= */

function showCondo() {

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const inventorySection =
        document.getElementById("inventorySection");


    if (housingSection) {
        housingSection.style.display = "none";
    }

    if (condoSection) {
        condoSection.style.display = "block";
    }

    if (inventorySection) {
        inventorySection.style.display = "none";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   OPEN PROJECT
========================================= */

function openProject(projectName) {

    const housingSection =
        document.getElementById("housingSection");

    const condoSection =
        document.getElementById("condoSection");

    const inventorySection =
        document.getElementById("inventorySection");

    const selectedProject =
        document.getElementById("selectedProject");

    const inventoryContainer =
        document.getElementById("inventoryContainer");


    /* CHECK ELEMENTS */

    if (!inventorySection) {

        alert(
            "ERROR: inventorySection not found."
        );

        return;
    }


    if (!selectedProject) {

        alert(
            "ERROR: selectedProject not found."
        );

        return;
    }


    if (!inventoryContainer) {

        alert(
            "ERROR: inventoryContainer not found.\n\n" +
            "Please make sure your inventory.html has:\n" +
            '<div id="inventoryContainer"></div>'
        );

        return;
    }


    /* CHECK INVENTORY DATA */

    if (typeof INVENTORY_DATA === "undefined") {

        alert(
            "ERROR: inventory-data.js is not loaded.\n\n" +
            "Make sure inventory-data.js is connected BEFORE script.js."
        );

        return;
    }


    /* HIDE PROJECT SECTIONS */

    if (housingSection) {
        housingSection.style.display = "none";
    }

    if (condoSection) {
        condoSection.style.display = "none";
    }


    /* SHOW INVENTORY */

    inventorySection.style.display = "block";


    selectedProject.innerText =
        projectName;


    /* LOAD DATA */

    loadInventory(projectName);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   LOAD INVENTORY
========================================= */

function loadInventory(projectName) {

    const container =
        document.getElementById("inventoryContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /* =====================================
       CHECK DATA
    ===================================== */

    if (typeof INVENTORY_DATA === "undefined") {

        container.innerHTML = `
            <div class="block-card">

                <h3>Inventory Data Error</h3>

                <p>
                    inventory-data.js was not loaded.
                </p>

            </div>
        `;

        return;
    }


    /* =====================================
       MIDDLE HOUSING
    ===================================== */

    const housingData =
        Array.isArray(
            INVENTORY_DATA.middleHousing
        )

        ? INVENTORY_DATA.middleHousing.filter(
            function(unit) {

                return unit.project === projectName;

            }
        )

        : [];


    /* =====================================
       MIDDLE CONDO
    ===================================== */

    const condoData =
        Array.isArray(
            INVENTORY_DATA.middleCondo
        )

        ? INVENTORY_DATA.middleCondo.filter(
            function(unit) {

                return unit.project === projectName;

            }
        )

        : [];


    /* =====================================
       RENDER HOUSING
    ===================================== */

    if (housingData.length > 0) {

        renderHousingInventory(
            housingData,
            container
        );

    }


    /* =====================================
       RENDER CONDO
    ===================================== */

    if (condoData.length > 0) {

        renderCondoInventory(
            condoData,
            container
        );

    }


    /* =====================================
       NO INVENTORY
    ===================================== */

    if (
        housingData.length === 0 &&
        condoData.length === 0
    ) {

        container.innerHTML = `

            <div class="block-card">

                <h3>No Available Inventory</h3>

                <p>
                    No inventory found for:
                    <strong>${projectName}</strong>
                </p>

            </div>

        `;

    }
}


/* =========================================
   RENDER MIDDLE HOUSING
========================================= */

function renderHousingInventory(
    data,
    container
) {

    const blocks = {};


    /* GROUP BY BLOCK */

    data.forEach(function(unit) {

        const blockName =
            unit.block || "Block";


        if (!blocks[blockName]) {

            blocks[blockName] = [];

        }


        blocks[blockName].push(unit);

    });


    /* CREATE BLOCK CARDS */

    Object.keys(blocks).forEach(
        function(blockName) {

            const blockCard =
                document.createElement("div");


            blockCard.className =
                "block-card";


            blockCard.innerHTML = `

                <h3>
                    ${blockName}
                </h3>

                <div class="lot-grid"></div>

            `;


            const lotGrid =
                blockCard.querySelector(
                    ".lot-grid"
                );


            /* CREATE LOT BUTTONS */

            blocks[blockName].forEach(
                function(unit) {

                    const lotButton =
                        document.createElement(
                            "button"
                        );


                    lotButton.type =
                        "button";


                    lotButton.className =
                        "lot";


                    let lotNumber =
                        unit.lot || "";


                    lotNumber =
                        String(lotNumber)
                        .replace(
                            /^Lot\s*/i,
                            ""
                        );


                    lotButton.innerText =
                        lotNumber;


                    lotButton.addEventListener(
                        "click",
                        function() {

                            showHousingDetails(
                                unit
                            );

                        }
                    );


                    lotGrid.appendChild(
                        lotButton
                    );

                }
            );


            container.appendChild(
                blockCard
            );

        }
    );
}


/* =========================================
   RENDER MIDDLE CONDO
========================================= */

function renderCondoInventory(
    data,
    container
) {

    const condoCard =
        document.createElement("div");


    condoCard.className =
        "block-card";


    condoCard.innerHTML = `

        <h3>
            AVAILABLE UNITS
        </h3>

        <div class="lot-grid"></div>

    `;


    const lotGrid =
        condoCard.querySelector(
            ".lot-grid"
        );


    data.forEach(function(unit) {

        const unitButton =
            document.createElement(
                "button"
            );


        unitButton.type =
            "button";


        unitButton.className =
            "lot";


        unitButton.innerText =
            unit.unitCode || "";


        unitButton.addEventListener(
            "click",
            function() {

                showCondoDetails(
                    unit
                );

            }
        );


        lotGrid.appendChild(
            unitButton
        );

    });


    container.appendChild(
        condoCard
    );
}


/* =========================================
   MIDDLE HOUSING DETAILS
========================================= */

function showHousingDetails(unit) {

    const housingDetails =
        document.getElementById(
            "housingDetails"
        );

    const condoDetails =
        document.getElementById(
            "condoDetails"
        );


    /* SHOW HOUSING */

    if (housingDetails) {

        housingDetails.style.display =
            "block";

    }


    /* HIDE CONDO */

    if (condoDetails) {

        condoDetails.style.display =
            "none";

    }


    /* PROJECT */

    document.getElementById(
        "detailProject"
    ).innerText =
        unit.project || "";


    /* LOT ALIAS */

    document.getElementById(
        "detailLotAlias"
    ).innerText =
        unit.lotAlias || "";


    /* BLOCK */

    document.getElementById(
        "detailBlock"
    ).innerText =
        unit.block || "";


    /* LOT */

    document.getElementById(
        "detailLot"
    ).innerText =
        unit.lot || "";


    /* LOT AREA */

    document.getElementById(
        "detailLotArea"
    ).innerText =
        (unit.lotArea || 0) +
        " sqm";


    /* FLOOR AREA */

    document.getElementById(
        "detailFloorArea"
    ).innerText =
        (unit.floorArea || 0) +
        " sqm";


    /* HOUSE MODEL */

    document.getElementById(
        "detailHouseModel"
    ).innerText =
        unit.houseModel || "";


    /* PRICE */

    document.getElementById(
        "detailPrice"
    ).innerText =
        formatPrice(
            unit.grossContractPrice
        );


    /* OPEN MODAL */

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }
}


/* =========================================
   MIDDLE CONDO DETAILS
========================================= */

function showCondoDetails(unit) {

    const housingDetails =
        document.getElementById(
            "housingDetails"
        );

    const condoDetails =
        document.getElementById(
            "condoDetails"
        );


    /* HIDE HOUSING */

    if (housingDetails) {

        housingDetails.style.display =
            "none";

    }


    /* SHOW CONDO */

    if (condoDetails) {

        condoDetails.style.display =
            "block";

    }


    /* PROJECT */

    document.getElementById(
        "condoProject"
    ).innerText =
        unit.project || "";


    /* LOT ALIAS */

    document.getElementById(
        "condoLotAlias"
    ).innerText =
        unit.lotAlias || "";


    /* BUILDING & FLOOR */

    document.getElementById(
        "condoBuildingFloor"
    ).innerText =
        unit.buildingFloor || "";


    /* UNIT CODE */

    document.getElementById(
        "condoUnitCode"
    ).innerText =
        unit.unitCode || "";


    /* FLOOR AREA */

    document.getElementById(
        "condoFloorArea"
    ).innerText =
        (unit.floorArea || 0) +
        " sqm";


    /* UNIT MODEL */

    document.getElementById(
        "condoUnitModel"
    ).innerText =
        unit.unitModel || "";


    /* PRICE */

    document.getElementById(
        "condoPrice"
    ).innerText =
        formatPrice(
            unit.grossContractPrice
        );


    /* OPEN MODAL */

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }
}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₱" +
        Number(
            price || 0
        ).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================
   CLOSE UNIT DETAILS
========================================= */

function closeUnitDetails() {

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }
}


/* =========================================
   CLOSE OUTSIDE MODAL
========================================= */

function closeOutside(event) {

    const modal =
        document.getElementById(
            "unitModal"
        );


    if (
        modal &&
        event.target === modal
    ) {

        closeUnitDetails();

    }
}


/* =========================================
   PAYMENT CALCULATOR
========================================= */

function openPaymentCalculator() {

    alert(
        "PAYMENT CALCULATOR\n\n" +
        "Next step: ikokonekta natin " +
        "ang actual Payment Calculator."
    );

}


/* =========================================
   HOLD UNIT
========================================= */

function holdUnit() {

    const housingDetails =
        document.getElementById(
            "housingDetails"
        );


    const housingVisible =
        housingDetails &&
        housingDetails.style.display !== "none";


    /* =====================================
       MIDDLE HOUSING
    ===================================== */

    if (housingVisible) {

        const project =
            document.getElementById(
                "detailProject"
            ).innerText;


        const lotAlias =
            document.getElementById(
                "detailLotAlias"
            ).innerText;


        const block =
            document.getElementById(
                "detailBlock"
            ).innerText;


        const lot =
            document.getElementById(
                "detailLot"
            ).innerText;


        alert(

            "HOLD THIS UNIT\n\n" +

            "Project: " +
            project +

            "\nLot Alias: " +
            lotAlias +

            "\nBlock: " +
            block +

            "\nLot: " +
            lot

        );


        return;
    }


    /* =====================================
       MIDDLE CONDO
    ===================================== */

    const project =
        document.getElementById(
            "condoProject"
        ).innerText;


    const lotAlias =
        document.getElementById(
            "condoLotAlias"
        ).innerText;


    const buildingFloor =
        document.getElementById(
            "condoBuildingFloor"
        ).innerText;


    const unitCode =
        document.getElementById(
            "condoUnitCode"
        ).innerText;


    alert(

        "HOLD THIS UNIT\n\n" +

        "Project: " +
        project +

        "\nLot Alias: " +
        lotAlias +

        "\nBuilding & Floor: " +
        buildingFloor +

        "\nUnit Code: " +
        unitCode

    );

}


/* =========================================
   BACK TO PROJECTS
========================================= */

function backToProjects() {

    const inventorySection =
        document.getElementById(
            "inventorySection"
        );


    const housingSection =
        document.getElementById(
            "housingSection"
        );


    const condoSection =
        document.getElementById(
            "condoSection"
        );


    if (inventorySection) {

        inventorySection.style.display =
            "none";

    }


    /*
       Ibalik natin ang tamang project
       section depende sa previous selection.
    */

    if (
        window.currentProductType ===
        "condo"
    ) {

        if (condoSection) {

            condoSection.style.display =
                "block";

        }

    } else {

        if (housingSection) {

            housingSection.style.display =
                "block";

        }

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   REMEMBER PRODUCT TYPE
========================================= */

const originalShowHousing =
    window.showHousing;

window.showHousing =
    function() {

        window.currentProductType =
            "housing";

        originalShowHousing();

    };


const originalShowCondo =
    window.showCondo;

window.showCondo =
    function() {

        window.currentProductType =
            "condo";

        originalShowCondo();

    };

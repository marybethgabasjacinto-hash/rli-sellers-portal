/* =========================================================
   RLI SELLERS PORTAL
   INVENTORY + UNIT DETAILS
   ========================================================= */


/* =========================================================
   SHOW MIDDLE HOUSING
   ========================================================= */

function showHousing() {

    document.getElementById("housingSection").style.display = "block";
    document.getElementById("condoSection").style.display = "none";
    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SHOW MIDDLE CONDO
   ========================================================= */

function showCondo() {

    document.getElementById("housingSection").style.display = "none";
    document.getElementById("condoSection").style.display = "block";
    document.getElementById("inventorySection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   OPEN PROJECT
   ========================================================= */

function openProject(projectName) {

    document.getElementById("housingSection").style.display = "none";
    document.getElementById("condoSection").style.display = "none";
    document.getElementById("inventorySection").style.display = "block";

    const selectedProject =
        document.getElementById("selectedProject");

    if (selectedProject) {
        selectedProject.innerText = projectName;
    }

    renderInventory(projectName);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   BACK TO PROJECTS
   ========================================================= */

function backToProjects() {

    document.getElementById("inventorySection").style.display = "none";

    document.getElementById("housingSection").style.display = "block";
    document.getElementById("condoSection").style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

    if (price === undefined || price === null || price === "") {
        return "-";
    }

    return "₱" + Number(price).toLocaleString("en-PH");
}


/* =========================================================
   FIND INVENTORY BY PROJECT
   ========================================================= */

function getProjectInventory(projectName) {

    let housing = [];
    let condo = [];

    if (
        typeof INVENTORY_DATA !== "undefined" &&
        INVENTORY_DATA.middleHousing
    ) {
        housing = INVENTORY_DATA.middleHousing.filter(function (item) {
            return item.project === projectName;
        });
    }

    if (
        typeof INVENTORY_DATA !== "undefined" &&
        INVENTORY_DATA.middleCondo
    ) {
        condo = INVENTORY_DATA.middleCondo.filter(function (item) {
            return item.project === projectName;
        });
    }

    return {
        housing: housing,
        condo: condo
    };
}


/* =========================================================
   RENDER INVENTORY
   ========================================================= */

function renderInventory(projectName) {

    const inventorySection =
        document.getElementById("inventorySection");

    if (!inventorySection) {
        console.error("inventorySection not found.");
        return;
    }

    const result = getProjectInventory(projectName);

    let housing = result.housing;
    let condo = result.condo;


    /* -----------------------------------------
       FIND OR CREATE INVENTORY CONTAINER
       ----------------------------------------- */

    let inventoryContainer =
        document.getElementById("dynamicInventory");

    if (!inventoryContainer) {

        inventoryContainer =
            document.createElement("div");

        inventoryContainer.id =
            "dynamicInventory";

        inventorySection.appendChild(
            inventoryContainer
        );
    }


    inventoryContainer.innerHTML = "";


    /* =====================================================
       MIDDLE HOUSING
       ===================================================== */

    if (housing.length > 0) {

        const title =
            document.createElement("h2");

        title.innerText = "MIDDLE HOUSING";

        inventoryContainer.appendChild(title);


        /* GROUP BY BLOCK */

        const blocks = {};

        housing.forEach(function (unit) {

            const block = unit.block || "Block";

            if (!blocks[block]) {
                blocks[block] = [];
            }

            blocks[block].push(unit);
        });


        Object.keys(blocks).forEach(function (blockName) {

            const blockCard =
                document.createElement("div");

            blockCard.className = "card";


            const blockTitle =
                document.createElement("h2");

            blockTitle.innerText = blockName;

            blockCard.appendChild(blockTitle);


            const lotGrid =
                document.createElement("div");

            lotGrid.className = "lot-grid";


            blocks[blockName].forEach(function (unit) {

                const lotButton =
                    document.createElement("button");

                lotButton.type = "button";

                lotButton.className = "lot";

                lotButton.innerText =
                    unit.lot
                        ? unit.lot.replace("Lot ", "")
                        : "-";


                lotButton.onclick = function () {

                    showHousingUnitDetails(unit);

                };


                lotGrid.appendChild(lotButton);

            });


            blockCard.appendChild(lotGrid);

            inventoryContainer.appendChild(
                blockCard
            );

        });

    }


    /* =====================================================
       MIDDLE CONDO
       ===================================================== */

    if (condo.length > 0) {

        const title =
            document.createElement("h2");

        title.innerText = "MIDDLE CONDO";

        title.style.marginTop = "30px";

        inventoryContainer.appendChild(title);


        const condoGrid =
            document.createElement("div");

        condoGrid.className = "lot-grid";


        condo.forEach(function (unit) {

            const unitButton =
                document.createElement("button");

            unitButton.type = "button";

            unitButton.className = "lot";

            unitButton.innerText =
                unit.unitCode || "-";


            unitButton.onclick = function () {

                showCondoUnitDetails(unit);

            };


            condoGrid.appendChild(unitButton);

        });


        inventoryContainer.appendChild(
            condoGrid
        );

    }


    /* =====================================================
       NO INVENTORY
       ===================================================== */

    if (
        housing.length === 0 &&
        condo.length === 0
    ) {

        const message =
            document.createElement("p");

        message.innerText =
            "No available OPEN inventory for this project.";

        message.style.padding = "20px";

        inventoryContainer.appendChild(
            message
        );
    }
}


/* =========================================================
   MIDDLE HOUSING DETAILS
   ========================================================= */

function showHousingUnitDetails(unit) {

    setDetail(
        "detailProject",
        unit.project
    );

    setDetail(
        "detailLotAlias",
        unit.lotAlias
    );

    setDetail(
        "detailBlock",
        unit.block
    );

    setDetail(
        "detailLot",
        unit.lot
    );

    setDetail(
        "detailLotArea",
        unit.lotArea + " sqm"
    );

    setDetail(
        "detailFloorArea",
        unit.floorArea + " sqm"
    );

    setDetail(
        "detailHouseModel",
        unit.houseModel
    );

    setDetail(
        "detailPrice",
        formatPrice(unit.grossContractPrice)
    );


    /* HIDE CONDO DETAILS */

    hideElement("condoDetailSection");


    /* SHOW HOUSING DETAILS */

    showElement("housingDetailSection");


    openUnitModal();
}


/* =========================================================
   MIDDLE CONDO DETAILS
   ========================================================= */

function showCondoUnitDetails(unit) {

    setDetail(
        "detailProject",
        unit.project
    );

    setDetail(
        "detailLotAlias",
        unit.lotAlias
    );

    setDetail(
        "detailBuildingFloor",
        unit.buildingFloor
    );

    setDetail(
        "detailUnitCode",
        unit.unitCode
    );

    setDetail(
        "detailFloorArea",
        unit.floorArea + " sqm"
    );

    setDetail(
        "detailUnitModel",
        unit.unitModel
    );

    setDetail(
        "detailPrice",
        formatPrice(unit.grossContractPrice)
    );


    /* HIDE HOUSING DETAILS */

    hideElement("housingDetailSection");


    /* SHOW CONDO DETAILS */

    showElement("condoDetailSection");


    openUnitModal();
}


/* =========================================================
   SET DETAIL VALUE
   ========================================================= */

function setDetail(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerText =
            value !== undefined &&
            value !== null &&
            value !== ""
                ? value
                : "-";
    }
}


/* =========================================================
   SHOW ELEMENT
   ========================================================= */

function showElement(id) {

    const element =
        document.getElementById(id);

    if (element) {
        element.style.display = "block";
    }
}


/* =========================================================
   HIDE ELEMENT
   ========================================================= */

function hideElement(id) {

    const element =
        document.getElementById(id);

    if (element) {
        element.style.display = "none";
    }
}


/* =========================================================
   OPEN UNIT MODAL
   ========================================================= */

function openUnitModal() {

    const modal =
        document.getElementById("unitModal");

    if (modal) {

        modal.style.display = "flex";

    } else {

        console.error(
            "unitModal not found."
        );
    }
}


/* =========================================================
   CLOSE UNIT DETAILS
   ========================================================= */

function closeUnitDetails() {

    const modal =
        document.getElementById("unitModal");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE
   ========================================================= */

function closeOutside(event) {

    const modal =
        document.getElementById("unitModal");

    if (
        modal &&
        event.target === modal
    ) {

        closeUnitDetails();

    }
}


/* =========================================================
   PAYMENT CALCULATOR
   ========================================================= */

function openPaymentCalculator() {

    alert(
        "PAYMENT CALCULATOR\n\n" +
        "Next step: ikokonekta natin dito " +
        "ang actual Payment Calculator."
    );
}


/* =========================================================
   HOLD UNIT
   ========================================================= */

function holdUnit() {

    const project =
        document.getElementById(
            "detailProject"
        )?.innerText || "-";


    const block =
        document.getElementById(
            "detailBlock"
        )?.innerText || "-";


    const lot =
        document.getElementById(
            "detailLot"
        )?.innerText || "-";


    const unitCode =
        document.getElementById(
            "detailUnitCode"
        )?.innerText || "-";


    alert(
        "HOLD THIS UNIT\n\n" +
        "Project: " + project +
        "\nBlock: " + block +
        "\nLot: " + lot +
        "\nUnit Code: " + unitCode
    );
}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "RLI Sellers Portal loaded."
        );

        if (
            typeof INVENTORY_DATA !==
            "undefined"
        ) {

            console.log(
                "Inventory data loaded."
            );

        } else {

            console.error(
                "inventory-data.js was not loaded."
            );
        }

    }
);

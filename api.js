const apiUniverse = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  return result = data.data.tools;
  // start spinner or loader
  toggleSpinner(true)
};


fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((response) => response.json())
  .then((data) => {

    const showAll = () => {
      const allData = data.data.tools;

      const apiContainer = document.getElementById('api-container');
      apiContainer.textContent = '';
      allData.map((allApi) => {

        const apiDiv = document.createElement('div');
        apiDiv.classList.add('col');
        apiDiv.innerHTML = `
            <div class="card">
            <img src="${allApi.image}" class="card-img-top " alt="...">
            <div class="card-body">
              <h5 class="card-title">features</h5>
              <ol>
                    <li>${allApi.features[0]}</li>
                    <li>${allApi.features[1]}</li>
                    <li>${allApi.features[2]}</li>
              </ol>
                        <hr>
            <div class="d-flex justify-content-between">
            <div>
            <p class="m-0 p-0 fw-semibold">${allApi.name}</p>
            
            <div class="d-flex">
            <i class="fa-solid fa-calendar-days mt-1"></i>
            <p class="ms-2 p-0">${allApi.published_in}</p>
            </div>
            </div>
               <div>
               <i onclick="loadApiDetails('${allApi.id}')" data-bs-toggle="modal" data-bs-target="#apiDetailModal" class="fas fa-arrow-right mt-4 bg-primary"></i>
               </div>
            </div>
            </div>
          </div>
            `;
        apiContainer.appendChild(apiDiv);
      });

    };

    document.getElementById("show-btn").addEventListener("click", () => {
      showAll();

    });

    const showHalf = () => {
      const halfData = data.data.tools.slice(0, 6);
      const apiContainer = document.getElementById('api-container');
      halfData.map((allApi) => {
        const apiDiv = document.createElement('div');
        apiDiv.classList.add('col');
        apiDiv.innerHTML = `
            <div class="card">
            <img src="${allApi.image}" class="card-img-top " alt="...">
            <div class="card-body">
              <h5 class="card-title">features</h5>
              <ol>
                    <li>${allApi.features[0]}</li>
                    <li>${allApi.features[1]}</li>
                    <li>${allApi.features[2]}</li>
              </ol>
                        <hr>
            <div class="d-flex justify-content-between">
            <div>
            <p class="m-0 p-0 fw-semibold">${allApi.name}</p>
            
            <div class="d-flex">
            <i class="fa-solid fa-calendar-days mt-1"></i>
            <p class="ms-2 p-0">${allApi.published_in}</p>
            </div>
            </div>
               <div class="">
                 <i onclick="loadApiDetails('${allApi.id}')" data-bs-toggle="modal" data-bs-target="#apiDetailModal" class="fas fa-arrow-right mt-4 bg-primary"></i>
               </div>
            </div>
            </div>
          </div>
            `;
        apiContainer.appendChild(apiDiv);
      });
      // stop spinner or loader
      toggleSpinner(false);
    };
    showHalf();
  })
  .catch((error) => console.log(error));



// spinner or loader
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none');
  }
}


const loadApiDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayApiDetails(data.data);
}

const displayApiDetails = allApi => {

  const apiDetails = document.getElementById('api-details');
  apiDetails.innerHTML = `
  
  <div class="d-flex gap-3">

    <div class="border border-warning p-3 rounded">
      <h5 class="">${allApi.description}</h5>
          <div class="container text-center">
              <div class="row align-items-center">

       <div class="col text-success">
          <p class="mb-0">${allApi.pricing?.[0].price ? allApi.pricing?.[0].price : 'Free of Cost/Basic' }</p>
          <p>${allApi.pricing?.[0].plan ? allApi.pricing?.[0].plan : ''}</p>
       </div>
       <div class="col text-warning">
           <p class="mb-0">${allApi.pricing?.[1].price ? allApi.pricing?.[1].price : 'Free Of Cost/Pro'}</p>
           <p>${allApi.pricing?.[1].plan ? allApi.pricing?.[1].plan : ''}</p>
        </div>
         <div class="col me-3 text-danger">
             <p class="mb-0">${allApi.pricing?.[2].price ? allApi.pricing?.[2].price : 'Free of Cost /Enterprise'}</p>
             <p>${allApi.pricing?.[2].plan ? allApi.pricing?.[2].plan : ''}</p>
          </div>
                  
            </div>
          </div>

    <div class="d-flex gap-3">

         <div class="ms-2">
         <h4>features</h4>
         <ul>
         <li>${allApi.features?.[1].feature_name ? allApi.features?.[1].feature_name : 'No Data '}</li>
         <li>${allApi.features[2].feature_name ? allApi.features[2].feature_name : 'No Data '}</li>
         <li>${allApi.features[3].feature_name ? allApi.features[3].feature_name : 'No Data '}</li>
         
         </ul>
          </div>
          
          <div>
       <h4>Integrations</h4>
        <ul>
        <li>${allApi.integrations?.[0] ? allApi.integrations?.[0] : 'No Data '}</li>
        <li>${allApi.integrations?.[1] ? allApi.integrations?.[1] : 'No Data '}</li>
        <li>${allApi.integrations?.[2] ? allApi.integrations?.[2] : 'No Data '}</li>
          </ul>
          </div>
      </div>
  </div>

     <div>
     <div class="position-relative">
     <img src="${allApi.image_link[0]}" alt="" class="w-75 rounded">
     <p class="text-bg-warning rounded px-2 w-auto position-absolute top-0 end-0 me-5">
        ${allApi.accuracy.score ? `${allApi.accuracy.score}% accuracy` : ''}
      </p>
      </div>

      <h6 class="text-center w-75 mt-3 fw-bold">${allApi.input_output_examples?.[0].input ? allApi.input_output_examples?.[0].input : 'Can you give any example?'}</h6>
      <p class="text-center w-75">${allApi.input_output_examples?.[0].output ? allApi.input_output_examples?.[0].output : 'No! Not Yet! Take a break!!!'}</p>

    </div>
</div>
  `;
}


apiUniverse();


<template>
  <div v-if="!isLoggedIn()" class="homePage">
    <section class="homePage--intro">
      <div class="homePage--intro--logo wrapper">
        <!-- *** Logo *** -->
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 797.5 149.6" style="enable-background:new 0 0 797.5 149.6;" xml:space="preserve" width="100%" height="149.60000610351562">

        <g id="NAME">
        <g class="st0">
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M158.4,110.3l0.1-0.1c-0.5,1.7-1.5,2.8-3,3.3c-1.5,0.5-3,0.8-4.4,0.8c-1.4,0-2.9-0.3-4.4-0.8
        c-1.5-0.5-2.5-1.6-2.9-3.3l0.1,0.1l-14.5-57.4c-0.9-3.1,0.6-5.2,4.3-6.2c3.6-1,5.9,0.3,7,3.8v-0.1l9,36.1h3l9-36.1
        c0.4-1.6,1.2-2.6,2.5-3c1.3-0.5,2.5-0.7,3.6-0.7c1.3,0,2.5,0.3,3.7,0.8s2.1,1.5,2.5,2.9c0.7,2.7,1.3,5.1,1.8,7.4
        c0.6,2.3,1.1,4.5,1.6,6.7c0.5,2.1,1,4.2,1.5,6.3c0.5,2.1,1,4.2,1.6,6.4l2.4,9.4h3c1.5-6,3-12,4.5-18.1c1.5-6.1,3-12.1,4.5-18.1
        l-0.1,0.1c1-3.5,3.4-4.7,7-3.8c3.8,0.9,5.2,3,4.3,6.2l-14.4,57.4l0.1-0.1c-0.4,1.7-1.4,2.8-2.9,3.3c-1.5,0.5-3,0.8-4.5,0.8
        c-1.4,0-2.8-0.3-4.3-0.8c-1.5-0.5-2.5-1.6-3-3.3l0.1,0.1l-7.9-31.1h-3L158.4,110.3z" class="svg-elem-1"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M252.4,47c1.9,0,3.9,0.4,5.9,1.2c2,0.8,4,1.8,5.9,3.1h-0.1c1.9,1.4,3.4,3.2,4.4,5.5c1,2.3,1.6,4.9,1.6,7.8
        v31.5c0,6.1-2,10.5-6,13.4c-3.9,2.8-7.8,4.2-11.8,4.2h-17.7c-1.9,0-3.9-0.3-5.9-1c-2-0.7-4-1.7-5.9-3.2c-4-2.8-6-7.3-6-13.4V64.7
        c0-3,0.5-5.6,1.6-7.8c1-2.3,2.5-4.1,4.4-5.5h-0.1c1.8-1.3,3.8-2.3,5.9-3.1c2.1-0.8,4.1-1.2,6-1.2H252.4z M250.4,103.3
        c2.7,0,4.7-0.8,5.8-2.3c1.1-1.6,1.7-3.2,1.7-5V64.8c0-1.8-0.6-3.5-1.7-5c-1.1-1.5-3.1-2.3-5.8-2.3h-13.7c-2.7,0-4.7,0.8-5.8,2.3
        c-1.1,1.5-1.7,3.2-1.7,5V96c0,1.8,0.6,3.4,1.7,5c1.1,1.6,3.1,2.3,5.8,2.3H250.4z" class="svg-elem-2"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M298.5,109.1c0,3.5-2,5.3-6.1,5.3c-4.1,0-6.1-1.8-6.1-5.3V64.6c0-3,0.5-5.7,1.4-7.9c1-2.2,2.5-4,4.5-5.4
        c3.9-2.8,7.8-4.2,11.8-4.2h17.8c3.8,0,7.7,1.4,11.8,4.2c4,2.8,6,7.2,6,13.3v44.6c0,3.5-2,5.3-6.1,5.3c-4.1,0-6.1-1.8-6.1-5.3V65.6
        c0-1.9-0.6-3.8-1.8-5.5l0.1,0.1c-1-1.8-2.9-2.7-5.9-2.7H306c-3,0-5,0.9-6,2.7c-1,1.6-1.6,3.4-1.6,5.4V109.1z" class="svg-elem-3"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M397.3,57.5h-21.4c-3,0-5,0.9-6,2.7c-1,1.6-1.6,3.4-1.6,5.4v31.9c0,1.9,0.6,3.4,1.8,4.4
        c1.2,1,3.1,1.5,5.9,1.5h11.4c2.7,0,4,1.7,4,5.2c0,1.5-0.3,2.7-0.9,3.7c-0.6,1-1.6,1.5-3,1.5H374c-4.7,0-8.8-1.2-12.4-3.5
        c-3.6-2.2-5.4-6.4-5.4-12.6v-33c0-3,0.5-5.7,1.4-7.9c1-2.2,2.5-4,4.5-5.4c3.9-2.8,7.8-4.2,11.8-4.2h23.4V30.4c0-3.5,2-5.3,6.1-5.3
        c4.1,0,6.1,1.8,6.1,5.3v78.7c0,3.5-2,5.3-6.1,5.3c-1.6,0-3-0.3-4.2-0.8c-1.3-0.6-1.9-1.8-1.9-3.7V57.5z" class="svg-elem-4"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M438.5,96c0,1.8,0.6,3.4,1.7,5c1.1,1.6,3.1,2.3,5.8,2.3h13.9c2.7,0,4.7-0.7,5.8-2.1c1.1-1.4,1.7-2.9,1.7-4.7
        v-1.2c0-3.5,2-5.2,6.1-5.2c4.1,0,6.1,1.7,6.1,5.2v1.3c0,3.1-0.5,5.7-1.5,7.6c-1,2-2.5,3.7-4.5,5.2c-3.9,2.8-7.8,4.2-11.8,4.2
        h-18.6c-3.9,0-7.7-1.4-11.4-4.2c-1.8-1.5-3.1-3.3-4.1-5.6c-1-2.3-1.4-4.9-1.4-7.8V64.6c0-6,1.8-10.4,5.5-13.3
        c1.8-1.3,3.7-2.4,5.7-3.2c2-0.8,3.9-1.2,5.7-1.2h18.6c1.8,0,3.7,0.4,5.9,1.1c2.1,0.7,4.1,1.6,6,2.8c1.8,1.3,3.2,3,4.3,5.2
        c1.1,2.2,1.6,4.8,1.6,7.9v15c0,1.7-0.5,3.2-1.5,4.5s-2.8,2-5.5,2h-23.9c-2.7,0-4.1-1.7-4.2-5.2c0-3.5,1.4-5.2,4.2-5.2h18.8
        l-0.1-10.3c0-1.8-0.6-3.5-1.7-5c-1.1-1.5-3.1-2.3-5.8-2.3H446c-2.7,0-4.7,0.8-5.8,2.3c-1.1,1.5-1.7,3.2-1.7,5V96z" class="svg-elem-5"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M507.9,109.1c0,3.5-2,5.3-6.1,5.3c-4.2,0-6.3-1.8-6.3-5.3V63.2c0-6.1,1.8-10.3,5.4-12.6
        c3.6-2.4,7.8-3.5,12.5-3.5h12.6c2.7,0,4.1,1.7,4.1,5.2c0.1,3.5-1.2,5.2-4.1,5.2h-11.8c-2.7,0-4.4,0.5-5.2,1.6
        c-0.8,1-1.2,2.5-1.2,4.3V109.1z" class="svg-elem-6"></path>
        </g>
        <g class="st0">
        <path fill="#ff6262;" stroke="#ff6262;" d="M556.3,57.5v40.3c0,1.9,0.4,3.4,1.2,4.4c0.8,1,2.5,1.6,5.2,1.6h2.9c2.9,0,4.2,1.7,4.1,5.1
        c0,3.5-1.4,5.2-4.1,5.2H562c-2.4,0-4.6-0.3-6.7-0.9c-2.1-0.6-4.1-1.5-6-2.7v0.1c-3.6-2.4-5.4-6.6-5.4-12.6V57.5h-4.3
        c-2.7,0-4.1-1.7-4.2-5.2c0-3.5,1.4-5.2,4.2-5.2h4.3V35.2c0-3.5,2.1-5.3,6.3-5.3c4.1,0,6.1,1.8,6.1,5.3V47h9.2
        c2.9,0,4.2,1.7,4.1,5.2c0,3.5-1.4,5.2-4.1,5.2H556.3z" class="svg-elem-7"></path>
        <path fill="#ff6262;" stroke="#ff6262" d="M598.4,113.8c-2.3,0-4.5-0.3-6.5-0.9c-2.1-0.6-4.1-1.5-6-2.7v0.1c-3.6-2.3-5.4-6.5-5.4-12.6v-5.4
        c0-3,0.5-5.7,1.6-7.9c1.1-2.3,2.6-4,4.5-5.4h-0.1c1.8-1.3,3.8-2.2,5.9-2.8c2.1-0.6,4.1-0.9,6-0.9h24.5V64.8c0-1.8-0.6-3.5-1.7-5
        c-1.1-1.5-3.1-2.3-5.8-2.3h-13c-2.8,0-4.7,0.7-5.8,2.1c-1.1,1.4-1.6,3-1.6,4.8v0.9c0,3.8-2.1,5.8-6.2,5.8c-4.1,0-6.2-1.9-6.2-5.8
        v-1c0-3,0.5-5.6,1.6-7.6c1.1-2.1,2.5-3.8,4.4-5.2h-0.1c1.9-1.3,3.9-2.3,6-3.1c2.1-0.8,4.1-1.2,6-1.2h16.8c1.8,0,3.8,0.4,5.9,1.2
        c2.1,0.8,4.1,1.8,5.9,3.1h-0.1c1.9,1.4,3.4,3.2,4.4,5.5c1,2.3,1.6,4.9,1.6,7.8v44.5c0,3.5-2,5.3-6.1,5.3c-0.8,0-1.6,0-2.3-0.1
        c-0.7-0.1-1.3-0.3-1.9-0.6c-0.6-0.3-1-0.8-1.3-1.4c-0.3-0.6-0.5-1.5-0.5-2.5l-0.1-24.3h-22.4c-1.6,0-2.9,0.2-3.8,0.6
        c-0.9,0.4-1.6,1-2.1,1.8c-0.6,1.3-1,2.2-1.3,2.9c-0.3,0.7-0.4,1.5-0.4,2.4v4.3c0,1.9,0.6,3.4,1.7,4.4c1.1,1,3.1,1.5,5.9,1.5h12.4
        c2.7,0,4.1,1.7,4.1,5.2c0,1.5-0.3,2.7-1,3.7c-0.7,1-1.7,1.5-3.1,1.5H598.4z" class="svg-elem-8"></path>
        <path fill="#ff6262" stroke="#ff6262" d="M687.5,75c1.8,0,3.8,0.4,5.9,1.3c2.1,0.9,4.1,1.9,5.9,3.2h-0.1c1.9,1.4,3.4,3.2,4.4,5.4c1,2.2,1.6,4.9,1.6,8
        v3.3c0,6.1-2,10.5-6,13.4c-1.9,1.5-3.9,2.5-5.9,3.2s-4,1-5.9,1h-18.8c-1.9,0-3.9-0.3-5.9-1s-4-1.7-5.9-3.2c-4-2.8-6-7.3-6-13.4
        v-1.3c0-3.2,2-4.7,6.1-4.7c4.1,0,6.2,1.6,6.2,4.7V96c0,1.8,0.6,3.4,1.7,5s3.1,2.3,5.9,2.3h14.6c2.8,0,4.8-0.8,5.9-2.3
        s1.7-3.2,1.7-5v-3.1c0-1-0.1-1.9-0.4-2.8c-0.3-0.9-0.7-1.7-1.3-2.4c-0.6-0.7-1.4-1.3-2.3-1.7c-1-0.4-2.1-0.7-3.5-0.7h-16.2
        c-3.8,0-7.7-1.3-11.9-4c-3.9-2.5-5.9-6.8-5.9-13v-3.8c0-3,0.5-5.6,1.6-7.8c1-2.3,2.5-4.1,4.4-5.5h-0.1c1.8-1.3,3.8-2.3,5.9-3.1
        c2.1-0.8,4.1-1.2,6-1.2h17.7c1.9,0,3.9,0.4,5.9,1.2c2,0.8,4,1.8,5.9,3.1h-0.1c1.9,1.4,3.4,3.2,4.4,5.5c1,2.3,1.6,4.9,1.6,7.8v1
        c0,1.6-0.5,2.7-1.6,3.4c-1,0.7-2.5,1.1-4.5,1.2c-4.1,0.1-6.1-1.4-6.1-4.5v-0.9c0-1.8-0.6-3.5-1.7-5c-1.1-1.5-3.1-2.3-5.8-2.3
        h-13.7c-2.7,0-4.7,0.8-5.8,2.3c-1.1,1.5-1.7,3.2-1.7,5v2.7c0,1.9,0.6,3.7,1.7,5.2c1.1,1.6,3.1,2.3,5.8,2.3H687.5z" class="svg-elem-9"></path>
        <path fill="#ff6262" stroke="#ff6262" d="M734,95.3v14.1c0,3.5-2,5.2-6.1,5.2c-4.1,0-6.1-1.7-6.1-5.2V30.4c0-3.5,2-5.3,6.1-5.3c4.1,0,6.1,1.8,6.1,5.3
        v47c1.8-2.2,3.9-4.6,6.2-7.1c2.3-2.5,4.5-5.1,6.8-7.8c2.3-2.6,4.5-5.2,6.7-7.8c2.2-2.5,4.3-4.9,6.2-7.2v0.1c1.3-1.6,2.7-2.3,4-2.3
        c0.7,0,1.5,0.2,2.2,0.5c0.7,0.3,1.5,0.8,2.3,1.4h-0.1c1.8,1.5,2.7,3,2.7,4.4c0,0.5-0.1,1.1-0.3,1.7c-0.2,0.6-0.6,1.2-1.1,1.6
        L734,95.3z M771.1,106.3c0.5,1,0.8,2,0.8,3c0,1.9-1.1,3.4-3.3,4.3c-1.5,0.9-2.8,1.3-4,1.3c-0.8,0-1.6-0.3-2.3-0.8
        c-0.7-0.6-1.3-1.2-1.8-2.1l-11.1-21.4c-0.7-1.1-1-2.2-1-3.3c0-1.8,1-3.4,2.9-4.7c0.5-0.4,1.1-0.7,1.6-1c0.6-0.3,1.2-0.5,1.8-0.7
        c0.8-0.1,1.6,0,2.3,0.4c0.7,0.4,1.4,1,1.9,1.8L771.1,106.3z" class="svg-elem-10"></path>
        </g>
        </g>
        <g id="ICON">
        <path fill="#ff6262" stroke="#ff6262" d="M104.3,75c0,13.1,0,26.2,0,39.3c0,6.8-4.3,11.1-11.1,11.1H35.4c-6.3,0-10.7-4.4-10.7-10.8
        c0-26.3,0-52.5,0-78.8c0-6.4,4.4-11.1,10.9-11.1c19.3-0.1,38.7-0.1,58,0c6-0.1,10.8,4.7,10.9,10.7c0,0.1,0,0.2,0,0.4
        C104.1,48.8,104.3,61.9,104.3,75z M64.3,50.3c-5.3,0-10.7,0-16.1,0c-2.8,0-4.5,1.3-4.7,3.4c-0.2,2.5,1.5,4.2,4.5,4.2
        c10.8,0,21.6,0,32.3,0c0.7,0.1,1.5-0.1,2.1-0.5c1-0.9,1.8-2,2.3-3.2c0.4-1.5-0.6-3.1-2.1-3.5c-1-0.3-2-0.5-3-0.5
        C74.6,50.3,69.5,50.3,64.3,50.3z M64.4,71.3H48.2c-2.9,0-4.5,1.3-4.6,3.7s1.4,3.8,4.4,3.8c10.9,0,21.7,0,32.6,0
        c2.9,0,4.3-1.3,4.4-3.6s-1.6-3.8-4.4-3.8C75.2,71.3,69.8,71.3,64.4,71.3z M64.2,99.2L64.2,99.2c5.5,0,11,0,16.5,0
        c2.8,0,4.3-1.4,4.2-3.8s-1.6-3.6-4.4-3.6c-10.8,0-21.7,0-32.5,0c-0.3,0-0.6,0-0.9,0c-2,0-3.6,1.7-3.6,3.7c0,0,0,0,0,0.1
        c-0.1,1.8,1.3,3.4,3.1,3.5c0.1,0,0.2,0,0.4,0C52.8,99.2,58.5,99.2,64.2,99.2z" class="svg-elem-11"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M64.3,50.3c5.1,0,10.3,0,15.4,0c1,0,2,0.2,3,0.5c1.5,0.4,2.5,2,2.1,3.5c-0.5,1.2-1.3,2.3-2.3,3.2
        c-0.6,0.4-1.4,0.6-2.1,0.5c-10.8,0-21.6,0-32.3,0c-3.1,0-4.8-1.7-4.5-4.3c0.2-2.1,1.9-3.4,4.7-3.4C53.6,50.3,59,50.3,64.3,50.3z" class="svg-elem-12"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M64.4,71.3c5.3,0,10.7,0,16.1,0c2.9,0,4.5,1.4,4.4,3.8s-1.4,3.6-4.4,3.6c-10.8,0-21.7,0-32.5,0
        c-3,0-4.5-1.3-4.5-3.8s1.7-3.7,4.6-3.7L64.4,71.3z" class="svg-elem-13"></path>
        <path fill="rgb(255, 255, 255);" stroke="rgb(255, 255, 255);" d="M64.2,99.2c-5.7,0-11.5,0.1-17.2,0c-1.8,0.1-3.4-1.3-3.5-3.2c0-0.1,0-0.2,0-0.4c-0.1-2,1.5-3.7,3.5-3.8
        c0,0,0,0,0.1,0c0.3,0,0.6,0,0.9,0c10.9,0,21.7,0,32.5,0c2.8,0,4.3,1.3,4.4,3.6s-1.4,3.7-4.2,3.8C75.2,99.3,69.7,99.2,64.2,99.2
        L64.2,99.2z" class="svg-elem-14"></path>
        </g>
        </svg>
      </div>

      <div class="homePage--intro--jumpTo">
        <a href="#login&register">
          <button class="iconOnly btn--icn--icon-chevron-circle-down" role="button" aria-label="Next Page"></button>
        </a>
      </div>
    </section>
    <section class="homePage--cta" id="login&register">
      <div class="container">
        <div class="flex-row">
          <div class="homePage--cta--card">
            <div class="flex-row">

              <div class="homePage--cta--card--text flex-col-md-8">
                <h1>Why Wondertask?</h1>
                <br>
                <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
                <p>Second line with some instructions on how to use.</p>
                <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
                <br>
                <br>
                <p>Second line with some instructions on how to use.</p>
                <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
              </div>
              <div class="homePage--cta--card--image flex-col-md-4">
                <!-- Import Lottie here -->  
                <!-- <img src="../assets/images/templ-ill-1.png" class="responsiveImg" alt="Task List"> -->
              </div>
              <div class="homePage--cta--card--image flex-col-md-5">
                <!-- <img src="../assets/images/antigravity.svg" class="responsiveImg" alt="Task List"> -->
              </div>
              <div class="homePage--cta--card--text flex-col-md-7">
                <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
                <p>Second line with some instructions on how to use.</p>
                <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
                <p>Second line with some instructions on how to use.</p>
              </div>
            </div>
          </div>
          
          <div class="homePage--cta--authentication">
            <div class="flex-row">
              <div class="flex-col-md-4 x0-Padding">
                <div id="toBeDefined" class="h100-md x4-Padding">
                  <h2>One just small bad news…</h2>
                  <p>Wondertask doesn't save your tasks in LocalStorage but in a Supabase database, so… well, you need to register.</p>
                  
                  <p>But there are good news also; you have your taks wherever you want. Youst login and you're up to go!</p>
                </div>
              </div>
              <div class="flex-col-md-4 x4-Padding">
                <Login></Login>
              </div>
              <div class="flex-col-md-4 x4-Padding">
                <Register></Register>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </section>
    <AppFooter></AppFooter>
  </div>
  <div v-else class="todoListApp">
    <CategoriesArea 
      :categories="categories" 
      :tasks="tasks" 
      @categoryUpdated="onFetch('categories')">
    </CategoriesArea>
    <TasksArea 
      :categories="categories" 
      :tasks="tasks"
      :index="0"
      @taskUpdated="onFetch('tasks')">
    </TasksArea>
  </div>
</template>

<script lang="ts">
  export const tasks: Ref<TASK[]> = ref([]);
  export const categories: Ref<CAT[]> = ref([]);

  /**
   * * Helper function for fetching Tasks or Categories.
   * @param tableType 
   */
  export const onFetch = async (tableType: string) => {
    const data: (TASK[] | CAT[]) = await fetchTable(tableType) as (TASK[] | CAT[]);

    tableType === "tasks" ? tasks.value = data as TASK[] : categories.value = data as CAT[]
  }

</script>

<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { TASK, CAT } from '../api/apiSupabase';

  import { ref, onMounted } from 'vue';
  import useAuthUser from "../composables/UseAuthUser";
  import { fetchTable } from '../api/apiSupabase';

  import CategoriesArea from '../components/CategoriesArea.vue';
  import TasksArea from '../components/TasksArea.vue';
  import Login from './Login.vue';
  import Register from './Register.vue';
  import AppFooter from '../components/AppFooter.vue';
  import { sortByUrgencyAndCompletion } from '../utils/tasksArea.utils';

  const {isLoggedIn} = useAuthUser();

  onMounted(async () => {
    await onFetch('categories')
    await onFetch('tasks')
    
    if(tasks.value) {
      await sortByUrgencyAndCompletion(tasks.value)
    }

    

    var wrapper = document.querySelectorAll('svg')
    var btnDraw = document.querySelector('.btn-draw')
    var btnErase = document.querySelector('.btn-erase')

    let hiddenElements = document.querySelectorAll('svg');
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        } else {
          entry.target.classList.remove('active')
        }
      })
    })
    
    hiddenElements.forEach((el) => observer.observe(el))


/*     function draw() {
      wrapper.forEach(el => el.classList.add('active'))
    }

    function erase() {
      wrapper.forEach(el => el.classList.remove('active'))
    }

    // Play draw animation once
    setTimeout(draw, 300) */

  }) 
</script>


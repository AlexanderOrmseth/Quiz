<template>
    <div class="wrap">
        <router-view></router-view>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500');
*{
    font-family: 'Roboto', sans-serif;
    padding:0;
    margin: 0;
    box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6{
    font-weight: 400;
}
li{
    list-style-type: none;
}
body{
    font-weight: 400;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-bottom: 1em;
}
.main-title{
    padding: .5em 0;
    border-bottom: 1px solid #d1d1d1;
    margin-bottom: 1em;
    text-transform: capitalize;
}
.wrap{
    max-width: 1000px;
    margin: 0 auto;
}
.content-wrap{
    max-width: 900px;
    padding: 0 1em;
    margin: 0 auto;
}
.button-row{
    margin-top: 2.2em;
}
.button-row button+button{
    margin-left: .6em;
}


.outer{
    margin-bottom: 2em;
    margin-top: 2em;
    padding: 2em 0;
    border-radius: 3px;
}
.outer.overlap{
    margin-bottom: 0;
}
.outer.overlap .content-wrap{
    margin-bottom: 1em;
}
.overlap-outer{
    margin-top: -2em;
}

@media (max-width: 1000px) {
    .outer{
        margin-top: 0;
        border-radius: 0;
    }
    .main-title{
        padding: .3em 0;
        margin-bottom: .5em;
    }
}



/*buttons*/
button{
    text-transform: capitalize;
    outline:none;
    font-size: 12px;
}
button:disabled {
  cursor: not-allowed;
  opacity: .4;
}
.btn{
    padding: 4px 8px;
    border-radius: 3px;
    border: 0;
    background: none;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: all .075s linear;
}
.btn-blue{
    background: #276cb5;
}
.btn-red{
    background: rgb(168, 30, 30);
}
.btn-red:not(:disabled):hover{
    background: rgb(146, 25, 25);
}
.btn-blue:not(:disabled):hover{
    background: #2160a3;
}
/* input */
.textbox{
    font-size: 100%;
    display: block;
    background: #f7f7f7;
    border: 1px solid #c6c6c6;
    border-radius: 3px;
    padding: 5px;
    max-width: 500px;
    width: 100%;
    transition: all .075s linear;
}
.textbox:hover{
    border: 1px solid #b9b9b9;
}
.textbox:focus, .textbox:active{
    background: #fff;
    border: 1px solid #276cb5;
    box-shadow: 0 0 4px rgba(39, 108, 181, .4);
}
</style>
<template>
  <div class="modal" >
    <style>html{overflow-y: hidden;} @media(min-width:768px){html{margin-right: 17px;}}</style>
    <div class="modal-wrap" @click="closeModal"></div>
    <div class="modal-container" :class="(modalActive) ? 'modal-container--active':''">
      <button class="modal-close" @click="closeModal">+</button>
      <div class="modal-text" v-html="itemsModal[modal_id]"></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      modalActive: false,
      itemsModal: {
        terms: `<h1>Terms title</h1><p>email@gmail.com</p>`,
        privacy: `<h1>Privacy title</h1>    <p> <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id vitae culpa fugit cum, ab voluptate in adipisci ut magni! Qui aspernatur eos vitae, illo tempore et mollitia minima neque veniam?</span> <span>Non autem ab facere aliquam officia accusantium minima quam, quaerat ratione temporibus natus repellendus nihil tempore excepturi, amet, quod quisquam porro neque expedita distinctio harum veritatis aspernatur. Debitis, illo? Veritatis.</span> <span>Neque minus eius error adipisci placeat repudiandae assumenda, ratione illo enim impedit repellendus deserunt facere voluptates? Facere error ut, molestias minus amet sapiente nisi odio natus magnam facilis autem officia!</span> <span>Suscipit quibusdam ipsa cum pariatur, nemo et autem quo quas hic ratione maxime veritatis possimus dolor dolorem libero. Similique praesentium libero, dicta magni facilis sunt, quis eos sequi in id?</span> <span>Sunt, sit reprehenderit provident distinctio recusandae debitis voluptates ipsa possimus, eaque temporibus officiis quae odio incidunt aut, iure fugit in voluptatum. Aut ad a, distinctio at aliquid doloribus voluptate, voluptatem?</span> <span>Eligendi voluptas similique quasi minima odio velit veritatis illo molestias eaque maxime placeat totam quas delectus magnam voluptates atque qui sit nobis excepturi natus eveniet, facilis est itaque rem temporibus.</span> <span>Veniam labore quam quasi laborum quae minus omnis aliquid, a dolorum laudantium ipsa deleniti, cumque reiciendis nostrum ex accusantium praesentium voluptatum, repellat mollitia possimus sapiente quaerat. Autem nisi nostrum enim.</span> <span>Doloribus dolores ut veritatis! Deleniti, eius fugiat, vero amet hic sit reprehenderit ut voluptatibus veniam cupiditate suscipit debitis dolor molestias similique reiciendis neque, harum. Corrupti, impedit. Ducimus in sint modi?</span> <span>Consequuntur ipsam sit placeat excepturi atque, nesciunt. Iste neque officia laborum consequuntur odio sit, perspiciatis officiis quod. Possimus, illo, incidunt. Quod earum laborum obcaecati, nemo dicta. Dignissimos quo consequuntur earum.</span> <span>Ab ipsa, blanditiis, eos inventore architecto quod magni cupiditate delectus doloribus! Explicabo minus voluptate dicta fugiat quasi quidem architecto aut modi odio. Incidunt praesentium, consequuntur tempora repudiandae ut vel odio.</span> </p> <p> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores asperiores consequatur esse. Fugit obcaecati, ducimus iste harum unde ab recusandae, in, veritatis itaque omnis facere, consequatur magnam cupiditate tempora ut!</span> <span>Non, libero. Incidunt asperiores animi quisquam, repellat numquam mollitia, saepe libero nemo obcaecati iste voluptates amet fuga, quas in consectetur iusto recusandae pariatur eligendi quam officia odio labore, quasi earum.</span> <span>Harum nisi repellendus voluptatum dolor, est commodi reprehenderit, qui architecto, quibusdam molestiae dolorem nihil. Recusandae porro esse voluptates cumque eius odio ut sint modi voluptatibus neque ab, fuga alias cum!</span> <span>Quod commodi a sint! Quis, accusamus deleniti perspiciatis, molestiae velit sequi, optio dolorem eius cupiditate ut, reprehenderit ipsum odio pariatur fuga. Dolorum veritatis culpa, voluptate molestiae odit praesentium, quos unde.</span> <span>Magni sed perferendis quisquam excepturi suscipit unde molestiae omnis exercitationem aut fugiat expedita repudiandae, placeat vel, sunt nobis ut, amet ab officiis quidem molestias similique aliquid! Pariatur nostrum cupiditate accusamus?</span> <span>Voluptatem, dolorum at veritatis expedita? Aperiam quam vitae cupiditate sint laborum fugit facilis quae ratione nihil atque. Voluptatem amet repellendus, suscipit iste accusantium odio nihil mollitia sequi minima sunt! Dolor?</span> <span>Dicta nisi iure eaque ut magnam libero adipisci veritatis nihil quaerat recusandae quis, distinctio mollitia ipsam harum necessitatibus illum nobis beatae rem quos commodi asperiores voluptas nemo placeat. Inventore, sit!</span> <span>Necessitatibus in, quam minima corrupti facere voluptatem veritatis sit qui reprehenderit. Earum modi ex voluptatibus odit nam obcaecati tenetur nostrum, accusantium totam, fugiat quaerat consequatur deleniti, impedit cum illo sed.</span> <span>Facilis ipsa odit, explicabo deleniti accusamus unde alias fugiat autem ab blanditiis aliquam iste eius vitae voluptatum. Soluta, voluptate, autem earum ex dolor eius cumque provident exercitationem dolorem animi at?</span> <span>Ea voluptas reprehenderit odio sequi fugit quibusdam dolor maxime molestiae totam similique tempore minus nobis architecto, vitae, modi unde nisi labore, neque repudiandae! Accusamus labore quidem itaque, saepe quod enim.</span> </p> <p> <span>Lorem ipsum dolor sit amet consectetur, adipisicing, elit. Ducimus odit, laboriosam dolore quaerat ut, commodi. Mollitia perferendis, unde. Eligendi error placeat voluptatibus amet doloribus quos, officia enim debitis consequatur, blanditiis?</span> <span>Repellendus dolore nobis, soluta maxime cupiditate totam praesentium quaerat amet necessitatibus nulla repudiandae incidunt ab modi harum enim iusto deleniti doloribus sequi itaque ipsam eligendi, reiciendis veniam? Eligendi, ipsa, animi!</span> <span>Ipsa illum qui quos illo voluptatibus a quis, enim, quasi velit tenetur unde expedita blanditiis rerum explicabo. Beatae alias nemo, praesentium tenetur cupiditate illum amet cum, quibusdam debitis obcaecati possimus.</span> <span>Praesentium est, odio perferendis modi totam corrupti ex quo tenetur, ipsa maxime ab. Ea quis voluptatum maxime deserunt sunt dicta quaerat vero, officia eos neque autem nemo veniam quisquam dolore.</span> <span>Officiis aut minus voluptatibus tempora placeat iure est nihil ratione ipsa, doloribus labore aperiam rerum culpa eius voluptate libero expedita odit obcaecati, autem iusto eaque quo optio magni porro? Cupiditate.</span> <span>Consectetur corrupti ex, voluptas, voluptates fuga porro, mollitia in reiciendis alias suscipit quo, ab! Aliquid, deleniti, hic eligendi eos dolor odit vero, accusamus odio harum, corrupti itaque repudiandae laudantium unde?</span> <span>Inventore labore, consectetur quibusdam soluta vel repudiandae eaque veniam animi molestias earum ducimus provident asperiores esse reprehenderit aliquam vitae temporibus maxime aspernatur enim. Reprehenderit vero iste dolorum mollitia, quis quaerat.</span> <span>Iste modi cum amet, maxime porro. Rem, similique fuga autem, aspernatur laborum quod temporibus modi laboriosam! Eius, recusandae nesciunt facere reiciendis fugiat veniam impedit quos eaque. Ex cupiditate est, maxime.</span> <span>Magnam, quisquam a, odio saepe fugit ut quis quos maiores consectetur quam dolorum, optio maxime soluta reprehenderit eos cumque error consequatur perspiciatis. Delectus, architecto obcaecati totam iste, distinctio fugit tenetur.</span> <span>Veniam explicabo deserunt earum enim fuga. Suscipit rerum ducimus itaque, perferendis voluptate excepturi, quo, pariatur aliquam reprehenderit totam dolores, animi. Commodi odio doloremque sequi accusantium, voluptatem perferendis deleniti nobis atque!</span> </p> <p> <span>Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Maiores incidunt aliquid, libero dignissimos consequuntur porro facere delectus sapiente accusantium ex nam veritatis possimus necessitatibus reiciendis eum consectetur quis harum, qui!</span> <span>Sequi itaque iste esse facilis id quae voluptas minus provident eveniet, magnam libero neque, consequatur qui corporis odio. Sed nemo temporibus iste laborum necessitatibus, ullam minima exercitationem dolor libero a.</span> <span>Enim inventore, itaque quod, laborum quisquam libero atque ipsam, reiciendis aliquid architecto earum repudiandae, quae. Ullam iusto quos saepe possimus! Nisi eum eveniet officia optio tempore, ad ipsum corrupti libero.</span> <span>Iusto deleniti animi reiciendis, fugiat at numquam, eaque eum sint asperiores ipsam neque maxime sunt tempore autem natus modi, necessitatibus cumque? Modi iste, explicabo eum voluptatibus doloribus tenetur atque, quia.</span> <span>Deserunt laudantium sapiente expedita error culpa voluptatibus dicta, debitis alias vel repudiandae illo illum nobis repellat earum voluptatum officia, praesentium excepturi omnis ratione obcaecati quo. Id sapiente nisi veritatis, nostrum.</span> <span>Assumenda a repellat ea officia fugiat velit, illum et voluptatem, quia sit consequuntur ipsa earum dolorem at id quod accusantium, officiis voluptate dolores rerum quaerat accusamus libero! Tempore, quod ea.</span> <span>Doloremque, vitae eius nulla asperiores harum nesciunt fugiat delectus earum, velit. Ab eos corrupti quod incidunt dicta eligendi provident odit assumenda debitis, officiis illum, perspiciatis, dolorum, iste ex commodi a.</span> <span>Minus id assumenda omnis rem hic odio autem nostrum ut consequuntur voluptatibus. Doloremque exercitationem, nostrum unde provident perspiciatis reiciendis facilis, impedit. Quia dicta, omnis officia pariatur tempora distinctio illum unde.</span> <span>Modi, provident quia odit porro neque, illum expedita facilis eius accusantium maxime blanditiis vero optio nisi laudantium pariatur omnis dolor dolorum sunt id sint ut ipsa, quo obcaecati. Ut, totam?</span> <span>Blanditiis obcaecati libero tenetur magni aperiam molestias quidem ducimus error molestiae deserunt. Molestias modi saepe amet distinctio cupiditate, a, quia vitae odit harum, aliquid suscipit labore corporis, ratione similique? Nulla.</span> </p>`
      }
    }
  },
  props: ['modal_id'],
  methods: {
    closeModal(e){
      e.preventDefault()
      this.modalActive = false;
      setTimeout(()=>{
        this.$parent.idModal = false;
      }, 500);
    }
  },
  mounted(){
    if(this.modal_id){
      setTimeout(()=>{
        this.modalActive = true;
      }, 0);
    }
  }
}
</script>
<style lang="scss">
.modal{
  position: fixed;
  left: 0; top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  padding: 30px 15px;
  overflow-y: auto;
  background: rgba(0,0,0, .75);
  @media(min-width:768px){
    padding: 60px 15px;
  }
  // &-flex{}
  &-wrap{
    position: fixed;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
    transition: background .3s ease;
    &:hover{
      background: rgba(255,255,255, .05);
    }
  }
  &-container{
    background: #fff;
    max-width: 100%;
    width: 1000px;
    padding: 60px 15px 30px 15px;
    position: relative;
    z-index: 2;
    margin: 0 auto;
    transform: translate(0, 50%);
    opacity: 0;
    transition: 1s ease-in-out;
    &--active{
      transform: translate(0, 0%);
      opacity: 1;
    }
  }
  &-close{
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    padding: 0;
    font-size: 40px;
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
    &:hover{
      opacity: .7;
    }
  }
  h1{
    font-size: 30px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  p{
    font-size: 16px;
    line-height: 1.3;
    & + p{
      margin-top: 15px;
    }
  }
}
</style>
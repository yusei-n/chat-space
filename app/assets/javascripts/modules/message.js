$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-items" data-message-id=${message.id}>
          <div class="message-items__info">
            <div class="message-items__info-name">
              ${message.user_name}
            </div>
            <div class="message-items__info-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-items__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-items" data-message-id=${message.id}>
        <div class="message-items__info">
          <div class="message-items__info-name">
            ${message.user_name}
          </div>
          <div class="message-items__info-time">
            ${message.created_at}
          </div>
        </div>
        <div class="message-items__message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__group-list').append(html);
      $('.chat-main__group-list').animate({ scrollTop: $('.chat-main__group-list')[0].scrollHeight});
      $('.Form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });
});
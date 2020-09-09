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

  let reloadMessages = function() {
    let last_message_id = $('.message-items:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__group-list').append(insertHTML);
        $('.chat-main__group-list').animate({ scrollTop: $('.chat-main__group-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
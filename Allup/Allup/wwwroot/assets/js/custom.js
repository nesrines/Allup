$(document).ready(function () {

    $('#searchInput').keyup(function (e) {
        e.preventDefault();
        let categoryId = $('#categoryId').val();
        let search = $('#searchInput').val().trim();
        if (search.length >= 3) {
            fetch('product/search?search=' + search + '&categoryId=' + categoryId)
                .then(res => res.text())
                .then(data => $('#searchBody').html(data));
        }
        else $('#searchBody').html('');
    })

    $('.modal-btn').click(function (e) {
        e.preventDefault();
        fetch($(this).attr('href'))
            .then(res => res.text())
            .then(data => {
                $('.modal-content').html(data);
                $('.quick-view-image').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    fade: true,
                    asNavFor: '.quick-view-thumb',
                    speed: 400,
                });
                $('.quick-view-thumb').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '.quick-view-image',
                    dots: false,
                    arrows: false,
                    focusOnSelect: true,
                    speed: 400,
                });
            });
    })

    $('.basket-btn').click(function (e) {
        e.preventDefault();
        fetch($(this).attr('href'))
            .then(res => res.text())
            .then(data => $('.header-cart').html(data));
    })

    $('.product-remove').click(function (e) {
        e.preventDefault();
        fetch($(this).attr('href'))
            .then(res => res.text())
            .then(data => {
                $('.header-cart').html(data);
                if (location.pathname == '/Basket') {
                    fetch('Basket/UpdateCart')
                        .then(res => res.text())
                        .then(data => {
                            $('#basketContent').html(data);
                            $('.product-remove').click(Remove());
                        });
                }
            });
    });

    $('#loadMoreBtn').on('click', function (e) {
        e.preventDefault();
        let pageIndex = $(this).data('pageindex');
        let maxPages = $(this).data('maxpages');

        if (pageIndex > 0 && pageIndex <= maxPages) {
            fetch($(this).attr('href') + '?pageIndex=' + pageIndex)
                .then(res => res.text())
                .then(data => {
                    $("#productContainer").append(data)
                    $('.basket-btn').click(function (e) {
                        e.preventDefault();
                        fetch($(this).attr('href'))
                            .then(res => res.text())
                            .then(data => $('.header-cart').html(data));
                    })
                });

            $(this).data('pageindex', pageIndex + 1)

            if (pageIndex == maxPages) $(this).remove();
        }
    })

    $('.sub').click(function (e) {
        e.preventDefault();
        $(this).next().val($(this).next().val() - 1);
        fetch('Basket/ChangeCount?id=' + $(this).next().data('id') + '&count=' + $(this).next().val())
            .then(res => res.text())
            .then(data => {
                $('.header-cart').html(data);
                fetch('Basket/UpdateCart')
                    .then(res => res.text())
                    .then(data => $('#basketContent').html(data));
        });
    });

    $('.add').click(function (e) {
        e.preventDefault();
        $(this).prev().val($(this).prev().val() + 1);
        fetch('Basket/ChangeCount?id=' + $(this).prev().data('id') + '&count=' + $(this).prev().val())
            .then(res => res.text())
            .then(data => {
                $('.header-cart').html(data);
                fetch('Basket/UpdateCart')
                    .then(res => res.text())
                    .then(data => $('#basketContent').html(data));
        });
    });

    $('.basket-count').change(function (e) {
        e.preventDefault();
        fetch('Basket/ChangeCount?id=' + $(this).data('id') + '&count=' + $(this).val())
            .then(res => res.text())
            .then(data => {
                $('.header-cart').html(data);
                fetch('Basket/UpdateCart')
                    .then(res => res.text())
                    .then(data => $('#basketContent').html(data));
            });
    });
});
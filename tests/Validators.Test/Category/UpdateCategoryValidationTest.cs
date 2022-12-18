﻿using ByteShop.Application.UseCases.Validations.Category;
using ByteShop.Exceptions;
using FluentAssertions;
using Utilities.Commands;
using Xunit;

namespace Validators.Test.Category;
public class UpdateCategoryValidationTest
{
    [Fact]
    public void Sucesso()
    {
        var validator = new UpdateCategoryValidation();
        var command = CategoryCommandBuilder.UpdateCategoryCommandBuild();

        var result = validator.Validate(command);

        result.IsValid.Should().BeTrue();
    }
    [Fact]
    public void ValidarErroNomeVazio()
    {
        var validator = new UpdateCategoryValidation();
        var command = CategoryCommandBuilder.UpdateCategoryCommandBuild();
        command.Name = string.Empty;

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle().And
            .Contain(error => error.ErrorMessage.Equals(ResourceErrorMessages.CATEGORY_NAME_EMPTY));
    }
    [Fact]
    public void ValidarErroNomeMaiorQue50Caracteres()
    {
        var validator = new UpdateCategoryValidation();
        var command = CategoryCommandBuilder.UpdateCategoryCommandBuild();
        command.Name = string.Join("", Enumerable.Repeat("x", 62));

        var result = validator.Validate(command);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle().And
            .Contain(error => error.ErrorMessage.Equals(ResourceErrorMessages.CATEGORY_NAME_MAXIMUMLENGTH));
    }
}
